import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const { forgotPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: 'Sending...', type: 'info' });
    const res = await forgotPassword(email);
    if (res.success) {
      setMsg({ text: res.message, type: 'success' });
    } else {
      setMsg({ text: res.message, type: 'error' });
    }
  };

  return (
    <div className="form-container animate-fade-in">
      <h2 className="form-title">Forgot Password</h2>
      {msg.text && (
        <div className={msg.type === 'error' ? "error-msg" : ""} style={msg.type === 'success' ? { color: 'var(--accent-color)', marginBottom: '1rem' } : {}}>
          {msg.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>Send Reset Link</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-muted)' }}>
        Remembered? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login here</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
