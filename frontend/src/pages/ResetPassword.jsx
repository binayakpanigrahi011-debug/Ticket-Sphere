import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const { resetPassword } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: 'Resetting...', type: 'info' });
    const res = await resetPassword(token, password);
    if (res.success) {
      setMsg({ text: 'Password reset successful. Redirecting...', type: 'success' });
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMsg({ text: res.message, type: 'error' });
    }
  };

  return (
    <div className="form-container animate-fade-in">
      <h2 className="form-title">Reset Password</h2>
      {msg.text && (
        <div className={msg.type === 'error' ? "error-msg" : ""} style={msg.type === 'success' ? { color: 'var(--accent-color)', marginBottom: '1rem' } : {}}>
          {msg.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
