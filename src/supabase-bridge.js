import { supabase } from './supabaseClient';

const SUPABASE_URL = 'https://qzlrngbedxmsfwlgbihi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_RTtM9IAPi6e_jjJKiR8X8g_3n3S7XJN';

async function supabaseRequest(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(data?.message || data?.hint || 'Supabase request failed');
  return data;
}

function field(form, selector) {
  return form.querySelector(selector)?.value?.trim() || '';
}

async function submitBooking(form) {
  const roomName = field(form, 'select');
  const rooms = await supabaseRequest(`rooms?select=id,name,price_per_night&name=eq.${encodeURIComponent(roomName)}&active=eq.true&limit=1`);
  if (!rooms?.length) throw new Error('The selected room is not available yet.');

  const room = rooms[0];
  const dateInputs = [...form.querySelectorAll('input[type="date"]')];
  const checkInDate = dateInputs[0]?.value || '';
  const checkOutDate = dateInputs[1]?.value || '';
  const guests = Number(field(form, 'input[type="number"]')) || 1;
  const nights = Math.max(0, Math.round((new Date(`${checkOutDate}T00:00:00`) - new Date(`${checkInDate}T00:00:00`)) / 86400000));

  if (!checkInDate || !checkOutDate || nights < 1) throw new Error('Please choose a valid check-in and check-out date.');

  const nightlyRate = Number(room.price_per_night) || 0;
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      room_id: room.id,
      guest_name: field(form, 'input[placeholder="Your name"]'),
      guest_email: field(form, 'input[type="email"]'),
      guest_phone: field(form, 'input[placeholder="+92 ..."]'),
      guests,
      check_in: checkInDate,
      check_out: checkOutDate,
      price_per_night: nightlyRate,
      subtotal: nightlyRate * nights,
      total_amount: nightlyRate * nights,
      special_requests: field(form, 'textarea'),
      status: 'pending',
      payment_status: 'unpaid',
    })
    .select()
    .single();

  if (error) throw new Error(error.message || 'Unable to create the booking.');
  return data;
}

async function submitContact(form) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      name: field(form, 'input[placeholder="Your name"]'),
      email: field(form, 'input[type="email"]'),
      phone: field(form, 'input[placeholder="+92 ..."]'),
      subject: field(form, 'input[placeholder="How can we help?"]'),
      message: field(form, 'textarea'),
    })
    .select()
    .single();

  if (error) throw new Error(error.message || 'Unable to submit your message.');
  return data;
}

function showFormError(form, message) {
  let box = form.querySelector('.backend-error');
  if (!box) {
    box = document.createElement('p');
    box.className = 'backend-error';
    box.style.margin = '10px 0 0';
    box.style.color = '#b42318';
    form.appendChild(box);
  }
  box.textContent = message;
}

function showSuccess(form, title, text) {
  const wrapper = form.parentElement;
  wrapper.innerHTML = `<div class="success-box"><span class="success-icon">✓</span><h3>${title}</h3><p>${text}</p></div>`;
}

export function connectSupabase() {
  document.addEventListener('submit', async (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.classList.contains('booking-form') && !form.classList.contains('contact-form')) return;

    event.preventDefault();
    event.stopPropagation();

    const button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.dataset.originalText = button.textContent; button.textContent = 'Sending...'; }

    try {
      if (form.classList.contains('booking-form')) {
        await submitBooking(form);
        showSuccess(form, 'Request received', 'Your booking request has been saved in the hotel database for confirmation.');
      } else {
        await submitContact(form);
        showSuccess(form, 'Enquiry received', 'Your message has been submitted to the hotel database.');
      }
    } catch (error) {
      showFormError(form, error.message || 'Something went wrong. Please try again.');
      if (button) { button.disabled = false; button.textContent = button.dataset.originalText || 'Submit'; }
    }
  }, true);

  console.info('Sarena Hotel: Supabase backend connected.');
}
