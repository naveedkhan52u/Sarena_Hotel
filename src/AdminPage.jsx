import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound, X } from 'lucide-react';
import './admin.css';

function PasswordField({ label, value, onChange, placeholder, show, onToggle, autoComplete }) {
  return <label className="admin-field">
    <span>{label}</span>
    <div className="admin-input-wrap">
      <LockKeyhole size={17} />
      <input required type={show ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} minLength={8} />
      <button type="button" className="password-toggle" onClick={onToggle} aria-label={show ? 'Hide password' : 'Show password'}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
    </div>
  </label>;
}

function AdminPage() {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [notice, setNotice] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false);

  const passwordScore = useMemo(() => {
    let score = 0;
    if (signupPassword.length >= 8) score++;
    if (/[A-Z]/.test(signupPassword)) score++;
    if (/[0-9]/.test(signupPassword)) score++;
    if (/[^A-Za-z0-9]/.test(signupPassword)) score++;
    return score;
  }, [signupPassword]);

  const submitLogin = (event) => {
    event.preventDefault();
    setNotice('Login interface is ready. Connect this form to your secure authentication service before using it for real administrator access.');
  };

  const submitSignup = (event) => {
    event.preventDefault();
    if (signupPassword !== confirmPassword) {
      setNotice('Passwords do not match.');
      return;
    }
    if (!accepted) {
      setNotice('Please confirm that you understand administrator access requirements.');
      return;
    }
    setNotice('Administrator account request captured in the UI. A real backend approval and secure password storage are required before production use.');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setNotice('');
    setShowPassword(false);
    setShowConfirm(false);
  };

  return <div className="admin-shell">
    <div className="admin-noise" />
    <button className="admin-exit" onClick={() => window.location.href = '/'} aria-label="Return to hotel website"><X size={18}/><span>Exit</span></button>

    <div className="admin-layout">
      <section className="admin-brand-panel">
        <div className="admin-brand-top">
          <span className="admin-logo">S</span>
          <div><strong>Sarena</strong><small>HOTEL</small></div>
        </div>
        <div className="admin-brand-copy">
          <span className="admin-kicker">PRIVATE ADMIN AREA</span>
          <h1>Manage the hotel experience <em>with confidence.</em></h1>
          <p>A dedicated control entrance for authorized Sarena Hotel administrators. Public visitors never need to see this area.</p>
        </div>
        <div className="admin-security-list">
          <div><ShieldCheck size={19}/><span><strong>Protected access</strong><small>Administrator-only workspace</small></span></div>
          <div><LockKeyhole size={19}/><span><strong>Secure by design</strong><small>Ready for real authentication integration</small></span></div>
          <div><UserRound size={19}/><span><strong>Controlled accounts</strong><small>Use approval for new administrators</small></span></div>
        </div>
        <div className="admin-brand-footer">SARENA HOTEL · ADMINISTRATOR PORTAL</div>
      </section>

      <section className="admin-card-area">
        <div className="admin-card">
          <div className="admin-card-head">
            <span className="admin-mini-badge"><LockKeyhole size={14}/> SECURE AREA</span>
            <h2>{mode === 'login' ? 'Welcome back.' : 'Create administrator access.'}</h2>
            <p>{mode === 'login' ? 'Sign in to continue to the Sarena Hotel control panel.' : 'Request a new administrator account for the hotel team.'}</p>
          </div>

          <div className="admin-tabs" role="tablist" aria-label="Administrator authentication">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')} role="tab" aria-selected={mode === 'login'}>Sign in</button>
            <button className={mode === 'signup' ? 'active' : ''} onClick={() => switchMode('signup')} role="tab" aria-selected={mode === 'signup'}>Create account</button>
          </div>

          {notice && <div className="admin-notice" role="status">{notice}</div>}

          {mode === 'login' ? <form className="admin-form" onSubmit={submitLogin}>
            <label className="admin-field"><span>Email address</span><div className="admin-input-wrap"><Mail size={17}/><input required type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="admin@sarenahotel.com" autoComplete="email" /></div></label>
            <PasswordField label="Password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="Enter your password" show={showPassword} onToggle={()=>setShowPassword(!showPassword)} autoComplete="current-password" />
            <div className="admin-form-row"><label className="admin-check"><input type="checkbox"/><span>Remember this device</span></label><button type="button" className="admin-link" onClick={()=>setNotice('Password recovery will be connected to the authentication provider when the backend is added.')}>Forgot password?</button></div>
            <button className="admin-submit" type="submit">Sign in securely <ArrowRight size={17}/></button>
          </form> : <form className="admin-form" onSubmit={submitSignup}>
            <label className="admin-field"><span>Full name</span><div className="admin-input-wrap"><UserRound size={17}/><input required value={name} onChange={e=>setName(e.target.value)} placeholder="Administrator name" autoComplete="name" /></div></label>
            <label className="admin-field"><span>Work email</span><div className="admin-input-wrap"><Mail size={17}/><input required type="email" value={signupEmail} onChange={e=>setSignupEmail(e.target.value)} placeholder="admin@sarenahotel.com" autoComplete="email" /></div></label>
            <PasswordField label="Create password" value={signupPassword} onChange={e=>setSignupPassword(e.target.value)} placeholder="Minimum 8 characters" show={showPassword} onToggle={()=>setShowPassword(!showPassword)} autoComplete="new-password" />
            <div className="password-meter" aria-label={`Password strength ${passwordScore} of 4`}><div className={`meter-fill strength-${passwordScore}`} /><span>{passwordScore < 2 ? 'Weak' : passwordScore === 2 ? 'Fair' : passwordScore === 3 ? 'Good' : 'Strong'}</span></div>
            <PasswordField label="Confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Repeat your password" show={showConfirm} onToggle={()=>setShowConfirm(!showConfirm)} autoComplete="new-password" />
            <div className="admin-requirements"><span><Check size={14}/> 8+ characters</span><span><Check size={14}/> Uppercase letter</span><span><Check size={14}/> Number</span><span><Check size={14}/> Special character</span></div>
            <label className="admin-check admin-terms"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/><span>I understand this account is for authorized hotel administration only.</span></label>
            <button className="admin-submit" type="submit">Request administrator access <ArrowRight size={17}/></button>
          </form>}

          <div className="admin-card-foot"><ShieldCheck size={15}/><span>Never share administrator passwords. Production authentication should use a secure identity provider and server-side authorization.</span></div>
        </div>
      </section>
    </div>
  </div>;
}

export default AdminPage;
