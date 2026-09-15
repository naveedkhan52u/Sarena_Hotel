import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, ArrowRight, Star, MapPin, Phone, Mail, CalendarDays, Wifi, Coffee, Car, Utensils, Sparkles, ChevronRight } from 'lucide-react';
import './styles.css';

const rooms = [
  { name: 'Deluxe King Room', price: 'PKR 18,500', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85', text: 'A calm, spacious retreat with a king bed and refined details.' },
  { name: 'Executive Suite', price: 'PKR 27,500', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85', text: 'Extra space, a separate sitting area and a polished stay experience.' },
  { name: 'Family Room', price: 'PKR 23,000', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85', text: 'Comfortable accommodation designed for families and longer stays.' }
];

const services = [
  ['Restaurant & Dining', Utensils, 'Freshly prepared meals and a relaxed dining experience.'],
  ['High-Speed Wi-Fi', Wifi, 'Reliable connectivity throughout the property.'],
  ['Airport Transfer', Car, 'Comfortable private transfers arranged around your schedule.'],
  ['Daily Housekeeping', Sparkles, 'Thoughtful daily service so your room stays effortless.']
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site">
      <header className="header">
        <div className="container nav">
          <button className="brand" onClick={() => go('home')} aria-label="Sarena Hotel home">
            <span className="brand-mark">S</span>
            <span><strong>SARENA</strong><small>HOTEL</small></span>
          </button>
          <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
            {['home','about','rooms','services','gallery','contact'].map(item => <button key={item} onClick={() => go(item)}>{item}</button>)}
            <button className="nav-book" onClick={() => setBookingOpen(true)}>Book a Stay</button>
          </nav>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="eyebrow light">WELCOME TO SARENA HOTEL</p>
            <h1>Stay somewhere<br /><em>worth remembering.</em></h1>
            <p className="hero-copy">Comfortable rooms, thoughtful service and a quiet sense of place. Everything you need for a better stay.</p>
            <div className="hero-actions"><button className="primary" onClick={() => setBookingOpen(true)}>Reserve your room <ArrowRight size={18} /></button><button className="text-btn" onClick={() => go('rooms')}>Explore rooms <ChevronRight size={18} /></button></div>
          </div>
          <div className="hero-scroll">SCROLL TO EXPLORE <span /></div>
        </section>

        <section className="booking-bar">
          <div className="container booking-inner">
            <div><span>CHECK IN</span><strong>Choose date</strong></div><CalendarDays size={20}/><div><span>CHECK OUT</span><strong>Choose date</strong></div><CalendarDays size={20}/><div><span>GUESTS</span><strong>2 Guests</strong></div><button onClick={() => setBookingOpen(true)}>Check availability <ArrowRight size={17}/></button>
          </div>
        </section>

        <section id="about" className="section about">
          <div className="container two-col">
            <div><p className="eyebrow">A QUIET KIND OF LUXURY</p><h2>Hospitality that feels <em>personal.</em></h2></div>
            <div><p className="lead">Sarena Hotel is designed for guests who value comfort without unnecessary fuss. From the first welcome to the last coffee, every detail is considered.</p><p>Whether you are travelling for business, exploring the region or simply taking a few days away, our goal is simple: make your stay feel easy.</p><button className="outline" onClick={() => go('contact')}>Discover Sarena <ArrowRight size={17}/></button></div>
          </div>
        </section>

        <section id="rooms" className="section rooms-section">
          <div className="container"><div className="section-heading"><div><p className="eyebrow">OUR ROOMS</p><h2>Designed for <em>rest.</em></h2></div><p>Simple, elegant spaces with everything you need and nothing you don't.</p></div>
            <div className="room-grid">{rooms.map(room => <article className="room-card" key={room.name}><img src={room.image} alt={room.name}/><div className="room-info"><div><h3>{room.name}</h3><p>{room.text}</p></div><strong>{room.price}<small> / night</small></strong><button onClick={() => setBookingOpen(true)}>View & book <ArrowRight size={16}/></button></div></article>)}</div>
          </div>
        </section>

        <section id="services" className="section services"><div className="container"><div className="center-heading"><p className="eyebrow">THE SARENA EXPERIENCE</p><h2>Everything you need, <em>close at hand.</em></h2></div><div className="service-grid">{services.map(([name, Icon, text]) => <div className="service" key={name}><Icon size={25}/><h3>{name}</h3><p>{text}</p></div>)}</div></div></section>

        <section id="gallery" className="gallery-section"><div className="gallery-grid"><img className="gallery-large" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85" alt="Hotel exterior"/><img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85" alt="Hotel room"/><img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=85" alt="Hotel pool"/><div className="gallery-note"><p className="eyebrow light">A GLIMPSE INSIDE</p><h2>Spaces made to <em>slow down.</em></h2><button className="text-btn light-btn" onClick={() => go('contact')}>Plan your stay <ArrowRight size={17}/></button></div></div></section>

        <section id="contact" className="section contact"><div className="container contact-grid"><div><p className="eyebrow">FIND US</p><h2>Come stay <em>with us.</em></h2><p className="lead">Our team is ready to help you plan a comfortable stay.</p><div className="contact-item"><MapPin size={20}/><span>Hotel Road, Gilgit-Baltistan, Pakistan</span></div><div className="contact-item"><Phone size={20}/><span>+92 300 0000000</span></div><div className="contact-item"><Mail size={20}/><span>stay@sarenahotel.com</span></div></div><div className="map"><iframe title="Sarena Hotel location map" src="https://www.google.com/maps?q=Gilgit%20Baltistan%20Pakistan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="map-label"><MapPin size={18}/> Sarena Hotel</div></div></div></section>
      </main>

      <footer><div className="container footer"><div><div className="footer-brand">SARENA HOTEL</div><p>A considered stay in the heart of Gilgit-Baltistan.</p></div><div><span>© 2026 Sarena Hotel</span><span>Privacy</span><span>Terms</span></div></div></footer>

      {bookingOpen && <div className="modal-backdrop" onClick={() => setBookingOpen(false)}><div className="booking-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setBookingOpen(false)}><X/></button><p className="eyebrow">RESERVE YOUR STAY</p><h2>Book a <em>room.</em></h2><p className="muted">Booking is currently an enquiry. Online payment and Supabase booking records can be connected later.</p><form onSubmit={e => { e.preventDefault(); alert('Thank you. Your booking enquiry has been received.'); setBookingOpen(false); }}><label>Full name<input required placeholder="Your name"/></label><div className="form-row"><label>Check-in<input required type="date"/></label><label>Check-out<input required type="date"/></label></div><label>Room<select><option>Deluxe King Room</option><option>Executive Suite</option><option>Family Room</option></select></label><label>Guests<select><option>1 Guest</option><option selected>2 Guests</option><option>3 Guests</option><option>4 Guests</option></select></label><button className="primary full" type="submit">Send booking enquiry <ArrowRight size={17}/></button></form></div></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
