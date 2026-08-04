import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, RefreshCw, LogOut, MessageCircle } from 'lucide-react';
import { useMockStore } from '../../store/mockStore';
import { PixelButton, PixelCard } from '../../components/ui/PixelComponents';

export const WaitForVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuth, logout } = useMockStore();
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState('');

  const handleCheckStatus = async () => {
    setChecking(true);
    setMessage('');
    try {
      const isAuth = await checkAuth();
      const updatedUser = useMockStore.getState().currentUser;
      if (isAuth && updatedUser && updatedUser.is_active !== false) {
        navigate('/swipe');
      } else {
        setMessage('Your account is still under admin review. Please try again shortly.');
      }
    } catch (e) {
      setMessage('Failed to check status. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-8 font-mono select-none">
      <div className="w-full max-w-md relative z-10">
        {/* Logo Header */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="w-10 h-10 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-lg shadow-pixel-sm">
            B
          </div>
          <span className="font-pixel text-xl text-white tracking-widest">BUMBULL</span>
        </div>

        {/* Card Body */}
        <PixelCard shadowVariant="primary" className="p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-accent/20 border-4 border-black flex items-center justify-center text-accent mb-6 shadow-pixel-sm animate-pulse">
            <Clock size={40} />
          </div>

          <h2 className="font-pixel text-sm text-white mb-4">VERIFICATION PENDING</h2>

          <p className="font-mono text-sm text-muted mb-4 leading-relaxed">
            Your account selfie is under review by our admin team. Verification usually takes less than 24 hours.
          </p>

          <p className="font-mono text-xs text-accent mb-6 bg-surface p-3 border-2 border-black">
            You will receive a notification via Telegram once your account is activated.
          </p>

          {message && (
            <div className="mb-4 p-3 border-2 border-black bg-primary/20 text-white font-mono text-xs w-full">
              {message}
            </div>
          )}

          <div className="flex flex-col gap-3 w-full">
            <PixelButton
              onClick={handleCheckStatus}
              variant="primary"
              className="py-3 flex items-center justify-center gap-2"
              disabled={checking}
            >
              <RefreshCw size={16} className={checking ? 'animate-spin' : ''} />
              {checking ? 'CHECKING...' : 'CHECK STATUS'}
            </PixelButton>

            <a
              href="https://t.me/bumbullbot"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-secondary border-4 border-black text-white font-pixel text-[10px] shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px]"
            >
              <span className="flex items-center justify-center gap-2">
                <MessageCircle size={14} /> OPEN TELEGRAM BOT
              </span>
            </a>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 font-pixel text-[9px] text-[#f43f5e] hover:underline mt-2 cursor-pointer"
            >
              <LogOut size={14} /> LOGOUT
            </button>
          </div>
        </PixelCard>
      </div>
    </div>
  );
};

export default WaitForVerificationPage;
