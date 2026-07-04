import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { PixelButton, PixelCard, PixelInput } from '../../components/ui/PixelComponents';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});

export const PasswordResetPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // Request Reset Link State
  const [phone, setPhone] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Confirm Reset Password State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  // General State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!phone) {
      setError('Phone number is required');
      return;
    }

    setLoading(true);
    try {
      // First fetch CSRF token to set CSRF cookie
      const csrfRes = await api.get('/accounts/api/csrf/');
      const csrfToken = csrfRes.data?.csrf_token;
      
      await api.post('/accounts/password-reset/request/', 
        { phone_number: phone },
        { headers: { 'X-CSRFToken': csrfToken } }
      );
      
      setRequestSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to request reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!newPassword) {
      setError('New password is required');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const csrfRes = await api.get('/accounts/api/csrf/');
      const csrfToken = csrfRes.data?.csrf_token;

      await api.post('/accounts/password-reset/confirm/',
        { token, new_password: newPassword },
        { headers: { 'X-CSRFToken': csrfToken } }
      );

      setConfirmSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Link expired or invalid token.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-8 font-mono select-none">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 text-primary opacity-20 text-6xl animate-bounce">🔐</div>
        <div className="absolute bottom-10 right-10 text-accent opacity-20 text-6xl animate-pulse">⭐</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-3xl shadow-pixel animate-bounce">
            B
          </div>
          <span className="font-pixel text-2xl text-white tracking-widest">BUMBULL</span>
          <span className="font-pixel text-[9px] text-muted tracking-wider">PASSWORD RECOVERY</span>
        </div>

        {/* Card Panel */}
        <PixelCard shadowVariant="primary" className="p-8 text-left">
          {error && (
            <div className="mb-4 p-3 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          {token ? (
            /* Phase 2: Enter New Password */
            confirmSuccess ? (
              <div className="text-center py-4">
                <div className="text-success font-pixel text-xs mb-4">SUCCESS: PASSWORD RESET COMPLETE</div>
                <p className="text-sm text-text">Redirecting to login player portal...</p>
              </div>
            ) : (
              <form onSubmit={handleConfirmReset} className="flex flex-col gap-6">
                <div className="border-4 border-black bg-secondary/10 p-3 mb-2">
                  <span className="font-pixel text-[8px] text-accent block mb-1">SIGNAL RECOVERY LINK VALIDATED</span>
                  <span className="text-[11px] text-text">Please input your new character authentication password below.</span>
                </div>

                <PixelInput
                  label="New Password"
                  type="password"
                  placeholder="Min 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <PixelInput
                  label="Confirm Password"
                  type="password"
                  placeholder="Retype password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="mt-4 flex flex-col gap-4">
                  <PixelButton type="submit" variant="primary" className="py-3" disabled={loading}>
                    {loading ? 'RESETTING...' : 'UPDATE PASSWORD'}
                  </PixelButton>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-pixel text-[8px] text-muted hover:text-white"
                  >
                    BACK TO LOGIN
                  </button>
                </div>
              </form>
            )
          ) : (
            /* Phase 1: Request Reset Link */
            requestSuccess ? (
              <div className="text-center py-4 flex flex-col gap-4">
                <div className="text-success font-pixel text-xs">RESET LINK SENT!</div>
                <p className="text-sm text-text leading-relaxed">
                  If this phone number is registered and linked to Telegram, a secure reset link has been dispatched to your Telegram chat.
                </p>
                <div className="border-4 border-black bg-surface p-3 mt-2 text-[11px] text-muted leading-normal">
                  Check your Telegram app for the Bumbull Bot signal messages to continue.
                </div>
                <PixelButton onClick={() => navigate('/login')} variant="secondary" className="mt-4">
                  RETURN TO LOGIN
                </PixelButton>
              </div>
            ) : (
              <form onSubmit={handleRequestReset} className="flex flex-col gap-6">
                <div className="border-4 border-black bg-secondary/10 p-3 mb-2">
                  <span className="font-pixel text-[8px] text-accent block mb-1">TELEGRAM PASSKEY CODE</span>
                  <span className="text-[11px] text-text">Enter your phone number to receive a secure recovery link via Telegram.</span>
                </div>

                <PixelInput
                  label="Phone Number"
                  placeholder="e.g., 09123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={11}
                />

                <div className="mt-4 flex flex-col gap-4">
                  <PixelButton type="submit" variant="primary" className="py-3" disabled={loading}>
                    {loading ? 'SENDING LINK...' : 'GET RECOVERY LINK'}
                  </PixelButton>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="font-pixel text-[8px] text-muted hover:text-white"
                  >
                    BACK TO LOGIN
                  </button>
                </div>
              </form>
            )
          )}
        </PixelCard>
      </div>
    </div>
  );
};
export default PasswordResetPage;
