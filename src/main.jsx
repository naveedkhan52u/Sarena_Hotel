import React, { useEffect, useState } from 'react';
import { Facebook, Instagram, Youtube, ArrowRight, Check, MapPin, Phone, Mail, CalendarDays, Users, Menu, X, Star, BedDouble, UtensilsCrossed, Car, Sparkles, Clock3, ShieldCheck } from 'lucide-react';
import './styles.css';

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/rooms', 'Rooms'],
  ['/services', 'Services'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: Youtube },
];

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button className="brand" onClick={() => navigate('/')} aria-label="Sarena Hotel home">
          <span className="brand-mark">S</span>
          <span><strong>Sarena</strong><small>HOTEL</small></span>
        </button>
        <nav className={open ? 'main-nav open' : 'main-nav'}>
          {navItems.map(([path, label]) => (
            <button key={path} onClick={() => { navigate(path); setOpen(false); }}>{label}</button>
          ))}
          <button className="nav-book" onClick={() => { onBook(); setOpen(false); }}>Book a Stay</button>
        </nav>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand"><span className="brand-mark">S</span><span><strong>Sarena</strong><small>HOTEL</small></span></div>
          <p>A calm, comfortable stay in the heart of Gilgit-Baltistan, designed around thoughtful hospitality and genuine guest care.</p>
          <div className="social-links" aria-label="Social media links">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
                <Icon size={19} />
              </a>
            ))}
          </div>
        </div>
        <div><h4>Explore</h4>{navItems.slice(1).map(([path, label]) => <button className="footer-link" key={path} onClick={() => navigate(path)}>{label}</button>)}</div>
        <div><h4>Contact</h4><p><MapPin size={15} /> Gilgit-Baltistan, Pakistan</p><p><Phone size={15} /> +92 300 0000000</p><p><Mail size={15} /> stay@sarenahotel.com</p></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Sarena Hotel. All rights reserved.</span><span>Comfort · Care · Hospitality</span></div>
    </footer>
  );
}

function BookingModal({ close }) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };
  return <div className="modal-backdrop" onMouseDown={close}>
    <div className="booking-modal" onMouseDown={e => e.stopPropagation()}>
      <button className="modal-close" onClick={close}><X size={20} /></button>
      {!submitted ? <><span className="eyebrow">RESERVATION</span><h2>Plan your stay</h2><p>Tell us a little about your visit and our team will confirm the details.</p>
        <form className="booking-form" onSubmit={submit}>
          <label>Full name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label>
          <label>Phone<input required placeholder="+92 ..." /></label><label>Guests<input required type="number" min="1" defaultValue="2" /></label>
          <label>Check-in<input required type="date" /></label><label>Check-out<input required type="date" /></label>
          <label className="full">Room preference<select><option>Deluxe Room</option><option>Executive Room</option><option>Family Suite</option></select></label>
          <label className="full">Message<textarea rows="3" placeholder="Any special request?"></textarea></label>
          <button className="primary-button full" type="submit">Send Booking Request <ArrowRight size={17} /></button>
        </form></> : <SuccessMessage title="Request received" text="Thank you. Your booking request has been recorded for confirmation." />}
    </div>
  </div>;
}

function SuccessMessage({ title, text }) { return <div className="success-box"><span className="success-icon"><Check size={25} /></span><h3>{title}</h3><p>{text}</p></div>; }

function Home({ onBook }) {
  return <>
    <section className="hero home-hero"><div className="container hero-content"><span className="eyebrow">WELCOME TO SARENA HOTEL</span><h1>Stay close to the beauty of <em>Gilgit-Baltistan.</em></h1><p>A warm, refined place to rest, recharge, and experience the region with comfort at the center.</p><div className="hero-actions"><button className="primary-button" onClick={onBook}>Book your stay <ArrowRight size={17} /></button><button className="text-button" onClick={() => navigate('/rooms')}>Explore rooms <ArrowRight size={16} /></button></div></div></section>
    <section className="intro section"><div className="container split-grid"><div><span className="eyebrow">A BETTER KIND OF STAY</span><h2>Comfort that feels <em>natural.</em></h2></div><div><p className="lead">From the first welcome to the final goodbye, every detail is designed to make your stay easy, restful, and memorable.</p><button className="text-button" onClick={() => navigate('/about')}>Our story <ArrowRight size={16} /></button></div></div></section>
    <section className="feature-strip"><div className="container feature-grid"><Feature icon={<BedDouble />} title="Comfortable rooms" text="Thoughtfully arranged spaces for restful nights." /><Feature icon={<UtensilsCrossed />} title="Dining" text="Simple, satisfying options for your day." /><Feature icon={<Car />} title="Local assistance" text="Helpful support for getting around the region." /></div></section>
    <section className="section"><div className="container section-heading"><div><span className="eyebrow">OUR ROOMS</span><h2>Rest well. Wake up <em>ready.</em></h2></div><button className="text-button" onClick={() => navigate('/rooms')}>View all rooms <ArrowRight size={16} /></button></div><div className="container room-cards"><RoomCard title="Deluxe Room" text="A quiet, polished room for couples and solo travelers." image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80" /><RoomCard title="Executive Room" text="More space and comfort for longer stays and business travel." image="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80" /><RoomCard title="Family Suite" text="Room to settle in comfortably when traveling together." image="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80" /></div></section>
  </>;
}
function Feature({ icon, title, text }) { return <div className="feature"><span className="feature-icon">{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>; }
function RoomCard({ title, text, image }) { return <article className="room-card"><img src={image} alt={title} /><div><span className="eyebrow">SARENA HOTEL</span><h3>{title}</h3><p>{text}</p><button className="text-button" onClick={() => navigate('/rooms')}>View room <ArrowRight size={15} /></button></div></article>; }

function InnerHero({ eyebrow, title, text }) { return <section className="inner-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>; }

function AboutPage() {
  return <><InnerHero eyebrow="OUR STORY" title={<>A hotel built around <em>hospitality.</em></>} text="A thoughtful place to stay while discovering the landscapes, communities, and character of Gilgit-Baltistan." />
    <section className="section"><div className="container story-grid"><div className="story-image-wrap"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85" alt="Sarena Hotel story and hospitality" /><span className="image-note">OUR STORY</span></div><div><span className="eyebrow">THE BEGINNING</span><h2>Made for guests who value <em>peace of mind.</em></h2><p className="lead">Sarena Hotel was imagined as more than a room for the night. It is a welcoming base for people visiting Gilgit-Baltistan for work, family, adventure, or simply a change of scenery.</p><p>Our approach is straightforward: keep the rooms comfortable, the spaces clean, the service attentive, and the experience personal. We believe good hospitality is often found in the small things, from a helpful recommendation to a quiet room after a long day.</p><p>As our hotel grows, the goal remains the same: give every guest a dependable place to rest and a team that treats their stay with genuine care.</p></div></div></section>
    <section className="soft-section"><div className="container"><div className="section-heading centered"><div><span className="eyebrow">WHAT WE VALUE</span><h2>Simple standards. <em>Consistent care.</em></h2></div></div><div className="values-grid"><Value icon={<ShieldCheck />} title="Trust" text="Clear communication, honest service, and respect for every guest." /><Value icon={<Sparkles />} title="Cleanliness" text="Well-kept spaces and attention to the details that matter." /><Value icon={<Clock3 />} title="Responsiveness" text="A helpful team that takes guest requests seriously." /></div></div></section>
  </>;
}
function Value({ icon, title, text }) { return <div className="value-card"><span>{icon}</span><h3>{title}</h3><p>{text}</p></div>; }

function ServicesPage() {
  return <><InnerHero eyebrow="SERVICES" title={<>Everything you need <em>under one roof.</em></>} text="Useful services, warm hospitality, and practical support to make your stay easier from arrival to departure." />
    <section className="section"><div className="container section-heading"><div><span className="eyebrow">HOTEL SERVICES</span><h2>Designed around <em>your stay.</em></h2></div></div><div className="container services-grid"><Service icon={<BedDouble />} title="Comfortable Accommodation" text="Well-appointed rooms with the essentials you need for a restful stay." /><Service icon={<UtensilsCrossed />} title="Dining" text="Convenient dining options and thoughtful service throughout your visit." /><Service icon={<Car />} title="Transport Assistance" text="Practical help with local transport, pickups, and getting around." /><Service icon={<MapPin />} title="Local Guidance" text="Useful recommendations for nearby places, experiences, and local attractions." /><Service icon={<Clock3 />} title="Guest Support" text="Responsive assistance for requests before, during, and after your stay." /><Service icon={<Sparkles />} title="Housekeeping" text="Clean, comfortable spaces maintained with care and consistency." /></div></section>
    <section className="soft-section special-section"><div className="container special-grid"><div><span className="eyebrow">SPECIAL REQUESTS</span><h2>Planning something <em>specific?</em></h2><p>Tell us what you need. Whether it is a celebration, an early arrival, local transport, or another practical request, our team will do its best to help arrange it.</p><button className="primary-button" onClick={() => navigate('/contact')}>Contact the hotel <ArrowRight size={17} /></button></div><div className="special-image-wrap"><img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85" alt="Hotel team preparing a special guest request" /></div></div></section>
  </>;
}
function Service({ icon, title, text }) { return <article className="service-card"><span className="service-icon">{icon}</span><h3>{title}</h3><p>{text}</p><button className="text-button" onClick={() => navigate('/contact')}>Ask about this <ArrowRight size={15} /></button></article>; }

function RoomsPage() { return <><InnerHero eyebrow="ROOMS" title={<>A comfortable place to <em>switch off.</em></>} text="Choose a room that fits the way you travel, with comfort, calm, and practical details in mind." /><section className="section"><div className="container room-list"><RoomDetail title="Deluxe Room" image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85" text="A refined, peaceful room for couples and solo travelers." /><RoomDetail title="Executive Room" image="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85" text="A spacious option for longer stays and business travel." /><RoomDetail title="Family Suite" image="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85" text="A flexible room setup for families and small groups." /></div></section></>; }
function RoomDetail({ title, image, text }) { return <article className="room-detail"><img src={image} alt={title} /><div><span className="eyebrow">SARENA HOTEL</span><h2>{title}</h2><p>{text}</p><ul><li><Check size={15} /> Comfortable bedding</li><li><Check size={15} /> Private bathroom</li><li><Check size={15} /> Wi-Fi access</li><li><Check size={15} /> Daily housekeeping</li></ul></div></article>; }

function GalleryPage() { const images = ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1000&q=80','https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80']; return <><InnerHero eyebrow="GALLERY" title={<>A glimpse of <em>Sarena.</em></>} text="Explore the spaces, details, and atmosphere that shape the guest experience." /><section className="section"><div className="container gallery-grid">{images.map((src, i) => <img key={src} src={src} alt={`Sarena Hotel gallery ${i + 1}`} />)}</div></section></>; }

function ContactPage() { const [submitted, setSubmitted] = useState(false); return <><InnerHero eyebrow="CONTACT" title={<>We are here to <em>help.</em></>} text="For reservations, questions, or special requests, contact the Sarena Hotel team." /><section className="section"><div className="container contact-grid"><div><span className="eyebrow">GET IN TOUCH</span><h2>Let’s make your stay <em>simple.</em></h2><p className="lead">Send an enquiry and our team can help with your stay, rooms, services, or special arrangements.</p><div className="contact-details"><div><MapPin /><span><strong>Address</strong>Gilgit-Baltistan, Pakistan</span></div><div><Phone /><span><strong>Phone</strong>+92 300 0000000</span></div><div><Mail /><span><strong>Email</strong>stay@sarenahotel.com</span></div></div></div>{!submitted ? <form className="contact-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@example.com" /></label><label>Phone<input placeholder="+92 ..." /></label><label>Subject<input required placeholder="How can we help?" /></label><label className="full">Message<textarea required rows="6" placeholder="Write your message..."></textarea></label><button className="primary-button full" type="submit">Send enquiry <ArrowRight size={17} /></button></form> : <SuccessMessage title="Enquiry received" text="Thank you. Your message has been submitted and is ready for hotel confirmation." />}</div></section><section className="map-section"><div className="container map-card"><MapPin /><div><span className="eyebrow">FIND US</span><h3>Gilgit-Baltistan, Pakistan</h3><p>Replace this map embed with the hotel's exact Google Maps location when the final address is confirmed.</p></div></div></section></>; }

function App() { const [path, setPath] = useState(window.location.pathname); const [booking, setBooking] = useState(false); useEffect(() => { const handler = () => setPath(window.location.pathname); window.addEventListener('popstate', handler); return () => window.removeEventListener('popstate', handler); }, []); useEffect(() => { const titles = { '/': 'Sarena Hotel | Gilgit-Baltistan', '/about': 'About | Sarena Hotel', '/services': 'Services | Sarena Hotel', '/rooms': 'Rooms | Sarena Hotel', '/gallery': 'Gallery | Sarena Hotel', '/contact': 'Contact | Sarena Hotel' }; document.title = titles[path] || titles['/']; }, [path]); let page = <Home onBook={() => setBooking(true)} />; if (path === '/about') page = <AboutPage />; if (path === '/services') page = <ServicesPage />; if (path === '/rooms') page = <RoomsPage />; if (path === '/gallery') page = <GalleryPage />; if (path === '/contact') page = <ContactPage />; return <><Header onBook={() => setBooking(true)} /><main>{page}</main><Footer />{booking && <BookingModal close={() => setBooking(false)} />}</>; }

export default App;
