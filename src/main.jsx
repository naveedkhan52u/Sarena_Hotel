import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, X, ArrowRight, MapPin, Phone, Mail, CalendarDays, Wifi, Coffee,
  Car, Utensils, Sparkles, ChevronRight, Clock, ShieldCheck, Users,
  BedDouble, ConciergeBell, CheckCircle2
} from 'lucide-react';
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
  ['Daily Housekeeping', Sparkles, 'Thoughtful daily service so your room stays effortless.'],
  ['Front Desk Assistance', ConciergeBell, 'Helpful assistance for check-in, local information and guest requests.'],
  ['Comfort & Security', ShieldCheck, 'A clean, welcoming environment with guest comfort and privacy in mind.']
];

const serviceDetails = [
  { title: 'Accommodation', icon: BedDouble, text: 'Choose from thoughtfully arranged rooms and suites for couples, families, business travellers and longer stays. Each room is designed around a simple idea: a quiet place to rest after a day of travel.', points: ['Comfortable sleeping spaces', 'Private guest accommodation', 'Regular housekeeping', 'Room assistance on request'] },
  { title: 'Dining', icon: Utensils, text: 'Enjoy convenient dining without having to leave the property. Our hospitality approach focuses on fresh food, a comfortable setting and service that respects your time.', points: ['Breakfast and meal options', 'Comfortable dining area', 'Guest dining assistance', 'Flexible service for groups'] },
  { title: 'Transfers & Transport', icon: Car, text: 'Travel days are easier when transport is arranged clearly. Ask our team about airport transfers, local transport and other travel requirements.', points: ['Airport transfer assistance', 'Local transport coordination', 'Arrival and departure planning', 'Travel information support'] },
  { title: 'Guest Support', icon: ConciergeBell, text: 'Our team is available to help with practical requests during your stay, from local information to room-related assistance.', points: ['Front desk assistance', 'Local information', 'Special requests', 'Stay planning support'] }
];

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Header({ onBook }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const go = (path) => { setMenuOpen(false); navigate(path); };
  return <header className="header">
    <div className="container nav">
      <button className="brand" onClick={() => go('/')} aria-label="Sarena Hotel home">
        <span className="brand-mark">S</span><span><strong>SARENA</strong><small>HOTEL</small></span>
      </button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <button onClick={() => go('/')}>Home</button>
        <button onClick={() => go('/about')}>About</button>
        <button onClick={() => go('/rooms')}>Rooms</button>
        <button onClick={() => go('/services')}>Services</button>
        <button onClick={() => go('/gallery')}>Gallery</button>
        <button onClick={() => go('/contact')}>Contact</button>
        <button className="nav-book" onClick={onBook}>Book a Stay</button>
      </nav>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </div>
  </header>;
}

function Footer() {
  return <footer><div className="container footer">
    <div><div className="footer-brand">SARENA HOTEL</div><p>A considered stay in the heart of Gilgit-Baltistan.</p></div>
    <div className="footer-links"><button onClick={() => navigate('/about')}>About</button><button onClick={() => navigate('/services')}>Services</button><button onClick={() => navigate('/contact')}>Contact</button><span>© 2026 Sarena Hotel</span></div>
  </div></footer>;
}

function BookingModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };
  return <div className="modal-backdrop" onClick={onClose}><div className="booking-modal" onClick={e => e.stopPropagation()}>
    <button className="modal-close" onClick={onClose}><X /></button>
    {!submitted ? <><p className="eyebrow">RESERVE YOUR STAY</p><h2>Book a <em>room.</em></h2><p className="muted">Send your preferred dates and room. Our team can confirm availability and final rates.</p>
      <form onSubmit={submit}>
        <label>Full name<input required placeholder="Your name" /></label>
        <div className="form-row"><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Phone<input required type="tel" placeholder="+92" /></label></div>
        <div className="form-row"><label>Check-in<input required type="date" /></label><label>Check-out<input required type="date" /></label></div>
        <label>Room<select><option>Deluxe King Room</option><option>Executive Suite</option><option>Family Room</option></select></label>
        <label>Guests<select><option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option></select></label>
        <label>Message<textarea rows="3" placeholder="Any special request?" /></label>
        <button className="primary full" type="submit">Send booking enquiry <ArrowRight size={17}/></button>
      </form></> : <SuccessMessage title="Enquiry received" text="Thank you. Your booking enquiry has been recorded on this page. Connect the form to your hotel email or booking backend before going live." />}
  </div></div>;
}

function SuccessMessage({ title, text }) { return <div className="success-message"><CheckCircle2 size={48}/><h2>{title}</h2><p>{text}</p><button className="primary" onClick={() => window.location.reload()}>Close</button></div>; }

function Home({ onBook }) {
  return <>
    <section className="hero"><div className="hero-overlay" /><div className="container hero-content"><p className="eyebrow light">WELCOME TO SARENA HOTEL</p><h1>Stay somewhere<br /><em>worth remembering.</em></h1><p className="hero-copy">Comfortable rooms, thoughtful service and a quiet sense of place. Everything you need for a better stay.</p><div className="hero-actions"><button className="primary" onClick={onBook}>Reserve your room <ArrowRight size={18}/></button><button className="text-btn" onClick={() => navigate('/rooms')}>Explore rooms <ChevronRight size={18}/></button></div></div><div className="hero-scroll">SCROLL TO EXPLORE <span /></div></section>
    <section className="booking-bar"><div className="container booking-inner"><div><span>CHECK IN</span><strong>Choose date</strong></div><CalendarDays size={20}/><div><span>CHECK OUT</span><strong>Choose date</strong></div><CalendarDays size={20}/><div><span>GUESTS</span><strong>2 Guests</strong></div><button onClick={onBook}>Check availability <ArrowRight size={17}/></button></div></section>
    <section className="section about"><div className="container two-col"><div><p className="eyebrow">A QUIET KIND OF LUXURY</p><h2>Hospitality that feels <em>personal.</em></h2></div><div><p className="lead">Sarena Hotel is designed for guests who value comfort without unnecessary fuss. From the first welcome to the last coffee, every detail is considered.</p><p>Whether you are travelling for business, exploring the region or simply taking a few days away, our goal is simple: make your stay feel easy.</p><button className="outline" onClick={() => navigate('/about')}>Discover Sarena <ArrowRight size={17}/></button></div></div></section>
    <section className="section rooms-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">OUR ROOMS</p><h2>Designed for <em>rest.</em></h2></div><p>Simple, elegant spaces with everything you need and nothing you don't.</p></div><div className="room-grid">{rooms.map(room => <article className="room-card" key={room.name}><img src={room.image} alt={room.name}/><div className="room-info"><div><h3>{room.name}</h3><p>{room.text}</p></div><strong>{room.price}<small> / night</small></strong><button onClick={onBook}>View & book <ArrowRight size={16}/></button></div></article>)}</div></div></section>
    <section className="section services"><div className="container"><div className="center-heading"><p className="eyebrow">THE SARENA EXPERIENCE</p><h2>Everything you need, <em>close at hand.</em></h2></div><div className="service-grid">{services.slice(0,4).map(([name, Icon, text]) => <div className="service" key={name}><Icon size={25}/><h3>{name}</h3><p>{text}</p></div>)}</div><div className="center-action"><button className="outline" onClick={() => navigate('/services')}>View all services <ArrowRight size={17}/></button></div></div></section>
    <GalleryPreview />
    <ContactPreview />
  </>;
}

function GalleryPreview() { return <section className="gallery-section"><div className="gallery-grid"><img className="gallery-large" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85" alt="Hotel exterior"/><img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85" alt="Hotel room"/><img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=85" alt="Hotel pool"/><div className="gallery-note"><p className="eyebrow light">A GLIMPSE INSIDE</p><h2>Spaces made to <em>slow down.</em></h2><button className="text-btn light-btn" onClick={() => navigate('/gallery')}>View gallery <ArrowRight size={17}/></button></div></div></section>; }
function ContactPreview() { return <section className="section contact"><div className="container contact-grid"><div><p className="eyebrow">FIND US</p><h2>Come stay <em>with us.</em></h2><p className="lead">Our team is ready to help you plan a comfortable stay.</p><div className="contact-item"><MapPin size={20}/><span>Hotel Road, Gilgit-Baltistan, Pakistan</span></div><div className="contact-item"><Phone size={20}/><span>+92 300 0000000</span></div><div className="contact-item"><Mail size={20}/><span>stay@sarenahotel.com</span></div><button className="outline" onClick={() => navigate('/contact')}>Contact the hotel <ArrowRight size={17}/></button></div><div className="map"><iframe title="Sarena Hotel location map" src="https://www.google.com/maps?q=Gilgit%20Baltistan%20Pakistan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="map-label"><MapPin size={18}/> Sarena Hotel</div></div></div></section>; }

function InnerHero({ eyebrow, title, text }) { return <section className="inner-hero"><div className="container"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{text}</p></div></section>; }

function AboutPage() { return <>
  <InnerHero eyebrow="ABOUT SARENA HOTEL" title={<>A welcoming place to <em>stay.</em></>} text="Thoughtful hospitality, comfortable accommodation and a genuine connection to Gilgit-Baltistan." />
  <section className="section"><div className="container two-col detailed-copy"><div><p className="eyebrow">OUR STORY</p><h2>Hospitality built around <em>people.</em></h2></div><div><p className="lead">Sarena Hotel is built around a straightforward promise: give every guest a clean, comfortable and welcoming place to stay.</p><p>We understand that a hotel is more than a room. It is the first place you return to after a long journey, the quiet space between meetings, the base for exploring a new destination and sometimes the setting for an important family trip.</p><p>Our approach is practical and personal. We focus on comfortable accommodation, responsive guest service, convenient facilities and clear communication from enquiry to checkout.</p></div></div></section>
  <section className="section soft-section"><div className="container story-grid"><div><h3>Comfort without unnecessary fuss</h3><p>Every part of the guest experience is designed to feel simple. From room selection and booking enquiries to everyday service, we aim to remove friction and let you concentrate on your trip.</p></div><div><h3>Connected to the region</h3><p>Gilgit-Baltistan offers remarkable landscapes, communities and travel experiences. Sarena Hotel gives guests a comfortable base from which to experience the region while still having a dependable place to return to.</p></div><div><h3>Service with attention</h3><p>Good hospitality is often made up of small things: a clear answer, a clean room, a timely request and a team that listens. Those details matter here.</p></div></div></section>
  <section className="section values-section"><div className="container"><div className="center-heading"><p className="eyebrow">WHAT MATTERS TO US</p><h2>Simple standards. <em>Real care.</em></h2></div><div className="value-grid"><div><ShieldCheck size={25}/><h3>Trust & privacy</h3><p>Guest information should be handled responsibly and accommodation details should be communicated clearly.</p></div><div><Sparkles size={25}/><h3>Cleanliness</h3><p>A comfortable stay begins with clean, well-presented spaces and consistent housekeeping.</p></div><div><Users size={25}/><h3>Personal service</h3><p>We treat questions and requests as part of the stay, not as an interruption to it.</p></div></div></div></section>
</>; }

function ServicesPage() { return <>
  <InnerHero eyebrow="HOTEL SERVICES" title={<>More than a room. <em>A complete stay.</em></>} text="Practical services designed to make your visit more comfortable, connected and convenient." />
  <section className="section"><div className="container"><div className="center-heading"><p className="eyebrow">OUR SERVICES</p><h2>Everything you need <em>under one roof.</em></h2><p>Service availability can vary by date and booking. Contact the hotel for current details.</p></div><div className="detailed-service-grid">{serviceDetails.map(({title, icon: Icon, text, points}) => <article className="detailed-service" key={title}><div className="service-icon"><Icon size={27}/></div><h3>{title}</h3><p>{text}</p><ul>{points.map(point => <li key={point}><CheckCircle2 size={16}/>{point}</li>)}</ul></article>)}</div></div></section>
  <section className="section soft-section"><div className="container two-col"><div><p className="eyebrow">SPECIAL REQUESTS</p><h2>Planning something <em>specific?</em></h2></div><div><p className="lead">Tell us what you need before arrival. For families, groups, business travellers or special occasions, advance communication helps us prepare a smoother stay.</p><button className="primary" onClick={() => navigate('/contact')}>Send an enquiry <ArrowRight size={17}/></button></div></div></section>
</>; }

function RoomsPage({ onBook }) { return <><InnerHero eyebrow="ROOMS & SUITES" title={<>Your space to <em>unwind.</em></>} text="Choose a room that fits the way you travel, from comfortable stays to extra space for families and longer visits." /><section className="section"><div className="container room-grid">{rooms.map(room => <article className="room-card" key={room.name}><img src={room.image} alt={room.name}/><div className="room-info"><div><h3>{room.name}</h3><p>{room.text}</p></div><strong>{room.price}<small> / night</small></strong><button onClick={onBook}>Enquire & book <ArrowRight size={16}/></button></div></article>)}</div></section></>; }

function GalleryPage() { return <><InnerHero eyebrow="GALLERY" title={<>A glimpse of <em>Sarena.</em></>} text="Explore the spaces, atmosphere and details that shape the guest experience." /><section className="section"><div className="container gallery-page-grid"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85" alt="Hotel exterior"/><img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85" alt="Hotel room"/><img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=85" alt="Hotel pool"/><img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=85" alt="Hotel lounge"/></div></section></>; }

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };
  return <><InnerHero eyebrow="CONTACT SARENA HOTEL" title={<>Let's plan your <em>stay.</em></>} text="Send us your question, booking request or special requirement. Our team can respond with the information you need." />
    <section className="section"><div className="container contact-page-grid"><div className="contact-details"><p className="eyebrow">GET IN TOUCH</p><h2>We are here to <em>help.</em></h2><p className="lead">For reservations, room availability, transport assistance or general questions, use the enquiry form or contact the hotel directly.</p><div className="contact-item"><MapPin size={20}/><span><strong>Address</strong>Hotel Road, Gilgit-Baltistan, Pakistan</span></div><div className="contact-item"><Phone size={20}/><span><strong>Phone</strong>+92 300 0000000</span></div><div className="contact-item"><Mail size={20}/><span><strong>Email</strong>stay@sarenahotel.com</span></div><div className="contact-item"><Clock size={20}/><span><strong>Guest assistance</strong>Available for enquiries and stay-related requests.</span></div></div>
      <div className="form-card">{!submitted ? <><p className="eyebrow">SEND AN ENQUIRY</p><h3>Tell us what you need.</h3><form onSubmit={submit}><div className="form-row"><label>Full name<input required placeholder="Your full name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label></div><div className="form-row"><label>Phone<input required type="tel" placeholder="+92" /></label><label>Subject<select><option>General enquiry</option><option>Room booking</option><option>Group booking</option><option>Transport</option><option>Special request</option></select></label></div><label>Message<textarea required rows="6" placeholder="Write your message here..." /></label><button className="primary full" type="submit">Submit enquiry <ArrowRight size={17}/></button></form></> : <SuccessMessage title="Message received" text="Thank you for contacting Sarena Hotel. The form has been submitted successfully on this website." />}</div></div></section>
    <section className="section map-section"><div className="container"><div className="map large-map"><iframe title="Sarena Hotel location map" src="https://www.google.com/maps?q=Gilgit%20Baltistan%20Pakistan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div className="map-label"><MapPin size={18}/> Sarena Hotel</div></div></div></section>
  </>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  const [bookingOpen, setBookingOpen] = useState(false);
  useEffect(() => { const handler = () => setPath(window.location.pathname.replace(/\/$/, '') || '/'); window.addEventListener('popstate', handler); return () => window.removeEventListener('popstate', handler); }, []);
  useEffect(() => { document.title = path === '/about' ? 'About | Sarena Hotel' : path === '/services' ? 'Services | Sarena Hotel' : path === '/contact' ? 'Contact | Sarena Hotel' : path === '/rooms' ? 'Rooms | Sarena Hotel' : path === '/gallery' ? 'Gallery | Sarena Hotel' : 'Sarena Hotel | Comfortable stays in Gilgit-Baltistan'; }, [path]);
  const content = path === '/about' ? <AboutPage /> : path === '/services' ? <ServicesPage /> : path === '/contact' ? <ContactPage /> : path === '/rooms' ? <RoomsPage onBook={() => setBookingOpen(true)} /> : path === '/gallery' ? <GalleryPage /> : <Home onBook={() => setBookingOpen(true)} />;
  return <div className="site"><Header onBook={() => setBookingOpen(true)} /><main>{content}</main><Footer />{bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}</div>;
}

createRoot(document.getElementById('root')).render(<App />);
