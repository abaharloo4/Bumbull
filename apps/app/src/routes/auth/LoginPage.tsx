import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import { PixelButton, PixelCard, PixelInput } from '../../components/ui/PixelComponents';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useMockStore((state) => state.login);
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      const success = await login(phone, password);
      if (success) {
        navigate('/swipe');
      } else {
        setError('Invalid phone number or password. Make sure your account is active (verified via bot & approved by admin).');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-8 font-mono select-none">
      {/* Decorative floating hearts background for retro style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 text-primary opacity-20 text-6xl animate-bounce">❤️</div>
        <div className="absolute bottom-10 right-10 text-accent opacity-20 text-6xl animate-pulse">⭐</div>
        <div className="absolute top-1/4 right-1/4 text-secondary opacity-20 text-5xl">👾</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-3xl shadow-pixel animate-bounce">
            B
          </div>
          <span className="font-pixel text-2xl text-white tracking-widest">BUMBULL</span>
          <span className="font-pixel text-[9px] text-muted tracking-wider">RETRO DATING NETWORK</span>
        </div>

        {/* Card Panel */}
        <PixelCard shadowVariant="primary" className="p-8 text-left">
          {error && (
            <div className="mb-4 p-3 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          <form onSubmit={handlePasswordLogin} className="flex flex-col gap-6">
            <PixelInput
              label="Phone Number"
              placeholder="e.g., 09123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
            />
            <PixelInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-4 flex flex-col gap-4">
              <PixelButton type="submit" variant="primary" className="py-3" disabled={loading}>
                {loading ? 'AUTHENTICATING...' : 'ENTER APP'}
              </PixelButton>
              <div className="text-center flex flex-col gap-2">
                <div>
                  <span className="font-mono text-sm text-muted">New player? </span>
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="font-pixel text-[9px] text-primary hover:underline"
                  >
                    CREATE CHARACTER
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/password-reset')}
                  className="font-pixel text-[8px] text-muted hover:text-white hover:underline mt-1"
                >
                  LOST PASSWORD? RECOVER KEY
                </button>
              </div>
            </div>
          </form>
        </PixelCard>
      </div>
    </div>
  );
};
export default LoginPage;
