import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BedDouble, Check, ChevronDown, CircleAlert, ClipboardList, Edit3, Eye, EyeOff, Home, Inbox, LayoutDashboard, LogOut, Mail, Menu, MessageSquare, Plus, RefreshCw, Save, Search, ShieldCheck, Trash2, UserRound, Users, X } from 'lucide-react';
import { supabase } from './supabaseClient';
import './admin.css';

const EMPTY_ROOM = { name: '', slug: '', description: '', room_type: 'Deluxe', max_guests: 2, bed_type: 'King', bed_count: 1, size_sqm: '', price_per_night: 0, total_rooms: 1, featured: false, active: true, sort_order: 0 };
const statusOptions = ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'rejected'];
const paymentOptions = ['unpaid', 'partial', 'paid', 'refunded'];

function PasswordField({ label, value, onChange, placeholder, show, onToggle, autoComplete }) {
  return <label className="admin-field"><span>{label}</span><div className="admin-input-wrap"><ShieldCheck size={17}/><input required type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} minLength={8}/><button type="button" className="password-toggle" onClick={onToggle}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div></label>;
}

function AuthScreen() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function login(e) {
    e.preventDefault(); setNotice(''); setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setNotice(error.message);
    setBusy(false);
  }

  async function signup(e) {
    e.preventDefault(); setNotice('');
    if (password !== confirm) return setNotice('Passwords do not match.');
    if (!accepted) return setNotice('Please confirm that this account is for authorized hotel administration.');
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    if (error) setNotice(error.message);
    else if (data.session) setNotice('Account created. You are signed in. If this is the first account, use the bootstrap button in the dashboard to activate administrator access.');
    else setNotice('Account created. Check your email to confirm the account, then sign in.');
    setBusy(false);
  }

  return <div className="admin-shell"><div className="admin-noise"/><button className="admin-exit" onClick={()=>window.location.href='/'}><X size={18}/> <span>Exit</span></button><div className="admin-layout"><section className="admin-brand-panel"><div className="admin-brand-top"><span className="admin-logo">S</span><div><strong>Sarena</strong><small>HOTEL</small></div></div><div className="admin-brand-copy"><span className="admin-kicker">PRIVATE ADMIN AREA</span><h1>Manage the hotel experience <em>with confidence.</em></h1><p>Bookings, rooms, guest enquiries and hotel content in one controlled workspace.</p></div><div className="admin-security-list"><div><ShieldCheck size={19}/><span><strong>Protected access</strong><small>Supabase authentication and role checks</small></span></div><div><LockIcon/><span><strong>Database protection</strong><small>Row-level security protects hotel data</small></span></div><div><UserRound size={19}/><span><strong>Controlled accounts</strong><small>Only an authorized admin can manage data</small></span></div></div><div className="admin-brand-footer">SARENA HOTEL · ADMINISTRATOR PORTAL</div></section><section className="admin-card-area"><div className="admin-card"><div className="admin-card-head"><span className="admin-mini-badge"><ShieldCheck size={14}/> SECURE AREA</span><h2>{mode==='login'?'Welcome back.':'Create administrator access.'}</h2><p>{mode==='login'?'Sign in to continue to the Sarena Hotel control panel.':'Create an account. New accounts are not administrators until securely promoted.'}</p></div><div className="admin-tabs"><button className={mode==='login'?'active':''} onClick={()=>{setMode('login');setNotice('')}}>Sign in</button><button className={mode==='signup'?'active':''} onClick={()=>{setMode('signup');setNotice('')}}>Create account</button></div>{notice&&<div className="admin-notice">{notice}</div>}{mode==='login'?<form className="admin-form" onSubmit={login}><label className="admin-field"><span>Email address</span><div className="admin-input-wrap"><Mail size={17}/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" autoComplete="email"/></div></label><PasswordField label="Password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" show={showPassword} onToggle={()=>setShowPassword(!showPassword)} autoComplete="current-password"/><div className="admin-form-row"><span/><button type="button" className="admin-link" onClick={async()=>{if(!email)return setNotice('Enter your email first.');const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/admin`});setNotice(error?error.message:'Password reset email sent.')}}>Forgot password?</button></div><button className="admin-submit" disabled={busy}>{busy?'Signing in…':<>Sign in securely <ArrowRight size={17}/></>}</button></form>:<form className="admin-form" onSubmit={signup}><label className="admin-field"><span>Full name</span><div className="admin-input-wrap"><UserRound size={17}/><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Administrator name"/></div></label><label className="admin-field"><span>Email address</span><div className="admin-input-wrap"><Mail size={17}/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com"/></div></label><PasswordField label="Create password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Minimum 8 characters" show={showPassword} onToggle={()=>setShowPassword(!showPassword)} autoComplete="new-password"/><PasswordField label="Confirm password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="Repeat your password" show={showConfirm} onToggle={()=>setShowConfirm(!showConfirm)} autoComplete="new-password"/><label className="admin-check admin-terms"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/><span>I understand this account is for authorized hotel administration only.</span></label><button className="admin-submit" disabled={busy}>{busy?'Creating…':<>Create account <ArrowRight size={17}/></>}</button></form>}<div className="admin-card-foot"><ShieldCheck size={15}/><span>Your password is handled by Supabase Auth. Administrative authorization is separate from user-editable profile metadata.</span></div></div></section></div></div>;
}
function LockIcon(){ return <span className="admin-inline-icon"><ShieldCheck size={19}/></span> }

function Dashboard({ user, onSignOut }) {
  const [section,setSection]=useState('overview');
  const [rooms,setRooms]=useState([]), [bookings,setBookings]=useState([]), [messages,setMessages]=useState([]);
  const [loading,setLoading]=useState(true), [busy,setBusy]=useState(false), [notice,setNotice]=useState('');
  const [roomModal,setRoomModal]=useState(null), [roomForm,setRoomForm]=useState(EMPTY_ROOM), [search,setSearch]=useState('');
  const [adminReady,setAdminReady]=useState(false);

  async function loadAll(){
    setLoading(true); setNotice('');
    const [r,b,m,p] = await Promise.all([
      supabase.from('rooms').select('*').order('sort_order').order('name'),
      supabase.from('bookings').select('*, rooms(name)').order('created_at',{ascending:false}),
      supabase.from('contact_messages').select('*').order('created_at',{ascending:false}),
      supabase.from('profiles').select('role').eq('id',user.id).maybeSingle()
    ]);
    const err=r.error||b.error||m.error||p.error;
    if(err) setNotice(err.message);
    setRooms(r.data||[]); setBookings(b.data||[]); setMessages(m.data||[]); setAdminReady(p.data?.role==='admin'||p.data?.role==='staff'); setLoading(false);
  }
  useEffect(()=>{loadAll()},[]);

  async function bootstrap(){
    setBusy(true); setNotice('');
    const {error}=await supabase.rpc('bootstrap_first_admin');
    if(error) setNotice(error.message); else { setNotice('Administrator access activated. Refreshing your session…'); await supabase.auth.refreshSession(); }
    await loadAll(); setBusy(false);
  }

  async function saveRoom(e){
    e.preventDefault(); setBusy(true); setNotice('');
    const payload={...roomForm,max_guests:Number(roomForm.max_guests),bed_count:Number(roomForm.bed_count),size_sqm:roomForm.size_sqm===''?null:Number(roomForm.size_sqm),price_per_night:Number(roomForm.price_per_night),total_rooms:Number(roomForm.total_rooms),sort_order:Number(roomForm.sort_order||0)};
    let result;
    if(roomModal==='new') result=await supabase.from('rooms').insert(payload);
    else result=await supabase.from('rooms').update(payload).eq('id',roomModal.id);
    if(result.error)setNotice(result.error.message); else {setRoomModal(null);await loadAll();}
    setBusy(false);
  }
  async function deleteRoom(room){
    if(!window.confirm(`Deactivate ${room.name}? This is safer than deleting a room with booking history.`))return;
    setBusy(true); const {error}=await supabase.from('rooms').update({active:false}).eq('id',room.id); if(error)setNotice(error.message); else await loadAll(); setBusy(false);
  }
  async function updateBooking(id,field,value){const {error}=await supabase.from('bookings').update({[field]:value}).eq('id',id);if(error)setNotice(error.message);else await loadAll()}
  async function markMessage(id,field){const {error}=await supabase.from('contact_messages').update({[field]:new Date().toISOString()}).eq('id',id);if(error)setNotice(error.message);else await loadAll()}

  const filteredBookings=useMemo(()=>bookings.filter(b=>`${b.booking_reference} ${b.guest_name} ${b.guest_email} ${b.rooms?.name||''}`.toLowerCase().includes(search.toLowerCase())),[bookings,search]);
  const filteredMessages=useMemo(()=>messages.filter(m=>`${m.name} ${m.email} ${m.subject} ${m.message}`.toLowerCase().includes(search.toLowerCase())),[messages,search]);
  const stats={total:bookings.length,pending:bookings.filter(x=>x.booking_status==='pending').length,confirmed:bookings.filter(x=>x.booking_status==='confirmed').length,unread:messages.filter(x=>!x.read_at).length,activeRooms:rooms.filter(x=>x.active).length};

  if(!adminReady) return <div className="dashboard-shell"><header className="dash-top"><div className="dash-brand"><span>S</span><div><strong>Sarena</strong><small>HOTEL ADMIN</small></div></div><button className="dash-logout" onClick={onSignOut}><LogOut size={16}/> Logout</button></header><main className="admin-bootstrap"><ShieldCheck size={48}/><h1>Administrator approval required</h1><p>This account is authenticated, but it is not an administrator yet. If this is the first Sarena Hotel administrator account, activate it once below.</p><button className="dash-primary" onClick={bootstrap} disabled={busy}>{busy?'Activating…':'Activate first administrator'}</button><p className="dash-note">For security, later accounts cannot self-promote to administrator.</p>{notice&&<div className="admin-notice">{notice}</div>}</main></div>;

  return <div className="dashboard-shell"><header className="dash-top"><div className="dash-brand"><span>S</span><div><strong>Sarena</strong><small>HOTEL ADMIN</small></div></div><div className="dash-user"><span>{user.email}</span><button className="dash-logout" onClick={onSignOut}><LogOut size={16}/> Logout</button></div></header><div className="dash-body"><aside className="dash-sidebar"><button className={section==='overview'?'active':''} onClick={()=>setSection('overview')}><LayoutDashboard size={17}/> Overview</button><button className={section==='bookings'?'active':''} onClick={()=>setSection('bookings')}><ClipboardList size={17}/> Bookings <b>{stats.pending}</b></button><button className={section==='messages'?'active':''} onClick={()=>setSection('messages')}><MessageSquare size={17}/> Contact Messages <b>{stats.unread}</b></button><button className={section==='rooms'?'active':''} onClick={()=>setSection('rooms')}><BedDouble size={17}/> Rooms</button><button onClick={()=>window.location.href='/'}><Home size={17}/> View website</button></aside><main className="dash-main"><div className="dash-heading"><div><span className="admin-kicker">SARENA HOTEL</span><h1>{section==='overview'?'Dashboard':section==='bookings'?'Bookings':section==='messages'?'Contact Messages':'Room Management'}</h1><p>Manage your hotel operations from one place.</p></div><button className="dash-refresh" onClick={loadAll}><RefreshCw size={16}/> Refresh</button></div>{notice&&<div className="admin-notice">{notice}</div>}{loading?<div className="dash-loading">Loading hotel data…</div>:section==='overview'?<Overview stats={stats} bookings={bookings} messages={messages} setSection={setSection}/>:section==='bookings'?<BookingsTable rows={filteredBookings} search={search} setSearch={setSearch} updateBooking={updateBooking}/>:section==='messages'?<MessagesTable rows={filteredMessages} search={search} setSearch={setSearch} markMessage={markMessage}/>:<RoomsPanel rooms={rooms} openNew={()=>{setRoomForm(EMPTY_ROOM);setRoomModal('new')}} openEdit={r=>{setRoomForm({...r});setRoomModal(r)}} deleteRoom={deleteRoom}/>}</main></div>{roomModal&&<RoomModal form={roomForm} setForm={setRoomForm} onClose={()=>setRoomModal(null)} onSave={saveRoom} busy={busy}/>}</div>;
}

function Overview({stats,bookings,messages,setSection}){return <><div className="stats-grid"><Stat icon={<ClipboardList/>} label="Total bookings" value={stats.total}/><Stat icon={<Inbox/>} label="Pending bookings" value={stats.pending}/><Stat icon={<Check/>} label="Confirmed" value={stats.confirmed}/><Stat icon={<MessageSquare/>} label="Unread messages" value={stats.unread}/><Stat icon={<BedDouble/>} label="Active rooms" value={stats.activeRooms}/></div><div className="dash-grid-two"><section className="dash-panel"><div className="panel-head"><div><h2>Recent bookings</h2><p>Latest reservation requests</p></div><button onClick={()=>setSection('bookings')}>View all <ArrowRight size={15}/></button></div>{bookings.slice(0,5).map(b=><div className="activity-row" key={b.id}><div><strong>{b.guest_name}</strong><small>{b.rooms?.name||'Room'} · {b.booking_reference}</small></div><StatusBadge value={b.booking_status}/></div>)}{!bookings.length&&<Empty text="No bookings yet."/>}</section><section className="dash-panel"><div className="panel-head"><div><h2>Latest enquiries</h2><p>Guest contact messages</p></div><button onClick={()=>setSection('messages')}>View all <ArrowRight size={15}/></button></div>{messages.slice(0,5).map(m=><div className="activity-row" key={m.id}><div><strong>{m.name}</strong><small>{m.subject||'General enquiry'}</small></div>{m.read_at?<span className="read-label">Read</span>:<span className="unread-dot">New</span>}</div>)}{!messages.length&&<Empty text="No contact messages yet."/>}</section></div></>}
function Stat({icon,label,value}){return <div className="stat-card"><span>{icon}</span><div><strong>{value}</strong><small>{label}</small></div></div>}
function StatusBadge({value}){return <span className={`status status-${value}`}>{String(value).replace('_',' ')}</span>}
function Empty({text}){return <div className="dash-empty">{text}</div>}
function SearchBox({value,setValue,placeholder}){return <div className="dash-search"><Search size={16}/><input value={value} onChange={e=>setValue(e.target.value)} placeholder={placeholder}/></div>}
function BookingsTable({rows,search,setSearch,updateBooking}){return <section className="dash-panel table-panel"><div className="panel-head"><div><h2>All bookings</h2><p>Review requests and update their status.</p></div><SearchBox value={search} setValue={setSearch} placeholder="Search guest or booking…"/></div><div className="table-wrap"><table><thead><tr><th>Guest</th><th>Room</th><th>Stay</th><th>Total</th><th>Booking</th><th>Payment</th></tr></thead><tbody>{rows.map(b=><tr key={b.id}><td><strong>{b.guest_name}</strong><small>{b.guest_email}<br/>{b.guest_phone}</small></td><td>{b.rooms?.name||'—'}</td><td>{b.check_in}<br/>{b.check_out}<small>{b.nights} night{b.nights===1?'':'s'}</small></td><td>PKR {Number(b.total_amount||0).toLocaleString()}</td><td><select value={b.booking_status} onChange={e=>updateBooking(b.id,'booking_status',e.target.value)}>{statusOptions.map(x=><option key={x}>{x}</option>)}</select><small>{b.booking_reference}</small></td><td><select value={b.payment_status} onChange={e=>updateBooking(b.id,'payment_status',e.target.value)}>{paymentOptions.map(x=><option key={x}>{x}</option>)}</select></td></tr>)}</tbody></table>{!rows.length&&<Empty text="No bookings match your search."/>}</div></section>}
function MessagesTable({rows,search,setSearch,markMessage}){return <section className="dash-panel table-panel"><div className="panel-head"><div><h2>Contact messages</h2><p>Read and track guest enquiries.</p></div><SearchBox value={search} setValue={setSearch} placeholder="Search messages…"/></div><div className="messages-list">{rows.map(m=><article className={`message-card ${m.read_at?'read':''}`} key={m.id}><div className="message-top"><div><strong>{m.name}</strong><small>{m.email}{m.phone?` · ${m.phone}`:''}</small></div><span>{new Date(m.created_at).toLocaleString()}</span></div><h3>{m.subject||'General enquiry'}</h3><p>{m.message}</p><div className="message-actions">{!m.read_at&&<button onClick={()=>markMessage(m.id,'read_at')}><Eye size={15}/> Mark read</button>}{!m.replied_at&&<button onClick={()=>markMessage(m.id,'replied_at')}><Check size={15}/> Mark replied</button>}{m.replied_at&&<span className="read-label">Replied</span>}</div></article>)}{!rows.length&&<Empty text="No messages match your search."/>}</div></section>}
function RoomsPanel({rooms,openNew,openEdit,deleteRoom}){return <section className="dash-panel table-panel"><div className="panel-head"><div><h2>Rooms</h2><p>Add, edit or deactivate rooms shown across the hotel website.</p></div><button className="dash-primary small" onClick={openNew}><Plus size={16}/> Add room</button></div><div className="room-admin-grid">{rooms.map(r=><article className={`room-admin-card ${!r.active?'inactive':''}`} key={r.id}><div className="room-admin-top"><span className="room-admin-icon"><BedDouble size={22}/></span><StatusBadge value={r.active?'active':'inactive'}/></div><h3>{r.name}</h3><p>{r.description||'No description added.'}</p><div className="room-meta"><span>{r.room_type}</span><span>{r.max_guests} guests</span><span>PKR {Number(r.price_per_night||0).toLocaleString()}/night</span></div><div className="room-actions"><button onClick={()=>openEdit(r)}><Edit3 size={15}/> Edit</button><button onClick={()=>deleteRoom(r)} disabled={!r.active}><Trash2 size={15}/> Deactivate</button></div></article>)}</div></section>}
function RoomModal({form,setForm,onClose,onSave,busy}){function set(k,v){setForm(x=>({...x,[k]:v}))}return <div className="modal-backdrop admin-modal-backdrop"><div className="room-modal"><button className="modal-close" onClick={onClose}><X size={20}/></button><div className="room-modal-head"><span className="admin-kicker">ROOM MANAGEMENT</span><h2>{form.id?'Edit room':'Add a new room'}</h2><p>These details are stored in Supabase and can be changed later.</p></div><form className="room-form" onSubmit={onSave}><label>Name<input required value={form.name} onChange={e=>set('name',e.target.value)}/></label><label>Slug<input required value={form.slug} onChange={e=>set('slug',e.target.value)}/></label><label>Room type<select value={form.room_type} onChange={e=>set('room_type',e.target.value)}><option>Deluxe</option><option>Executive</option><option>Suite</option><option>Family</option><option>Standard</option></select></label><label>Bed type<input value={form.bed_type||''} onChange={e=>set('bed_type',e.target.value)}/></label><label>Max guests<input type="number" min="1" value={form.max_guests} onChange={e=>set('max_guests',e.target.value)}/></label><label>Bed count<input type="number" min="1" value={form.bed_count} onChange={e=>set('bed_count',e.target.value)}/></label><label>Price per night (PKR)<input type="number" min="0" value={form.price_per_night} onChange={e=>set('price_per_night',e.target.value)}/></label><label>Total rooms<input type="number" min="1" value={form.total_rooms} onChange={e=>set('total_rooms',e.target.value)}/></label><label>Size (m²)<input type="number" min="0" value={form.size_sqm??''} onChange={e=>set('size_sqm',e.target.value)}/></label><label>Sort order<input type="number" min="0" value={form.sort_order||0} onChange={e=>set('sort_order',e.target.value)}/></label><label className="full">Description<textarea rows="4" value={form.description||''} onChange={e=>set('description',e.target.value)}/></label><label className="room-switch"><input type="checkbox" checked={!!form.featured} onChange={e=>set('featured',e.target.checked)}/> Featured room</label><label className="room-switch"><input type="checkbox" checked={form.active!==false} onChange={e=>set('active',e.target.checked)}/> Active on website</label><div className="room-modal-actions"><button type="button" className="dash-secondary" onClick={onClose}>Cancel</button><button className="dash-primary" disabled={busy}><Save size={16}/> {busy?'Saving…':'Save room'}</button></div></form></div></div>}

export default function AdminPage(){
  const [user,setUser]=useState(null); const [checking,setChecking]=useState(true);
  useEffect(()=>{let mounted=true;supabase.auth.getSession().then(({data})=>{if(mounted)setUser(data.session?.user||null);setChecking(false)});const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setUser(session?.user||null));return()=>{mounted=false;subscription.unsubscribe()};},[]);
  async function signOut(){await supabase.auth.signOut();setUser(null)}
  if(checking)return <div className="admin-loading">Checking secure session…</div>;
  return user?<Dashboard user={user} onSignOut={signOut}/>:<AuthScreen/>;
}
