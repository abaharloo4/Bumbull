import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockStore } from '../../store/mockStore';
import { PixelButton, PixelCard, PixelInput } from '../../components/ui/PixelComponents';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useMockStore((state) => state.login);
  
  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Phone number is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    login(phone);
    navigate('/swipe');
  };

  const handleGenerateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setError('Phone number is required');
      return;
    }

    // Mock generating a 6-digit OTP code
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
    setError('');
  };

  const simulateOtpVerify = () => {
    // When simulating verify (polling or click verify)
    login(phone);
    navigate('/swipe');
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
          <span className="font-pixel text-2xl text-white tracking-widest">BUMBUL</span>
          <span className="font-pixel text-[9px] text-muted tracking-wider">RETRO DATING NETWORK</span>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-4 border-black mb-6">
          <button
            onClick={() => { setActiveTab('password'); setError(''); }}
            className={`flex-1 py-3 font-pixel text-[10px] border-r-4 border-black cursor-pointer ${
              activeTab === 'password' ? 'bg-primary text-white' : 'bg-surface text-text hover:text-white'
            }`}
          >
            PASSWORD LOGIN
          </button>
          <button
            onClick={() => { setActiveTab('otp'); setError(''); }}
            className={`flex-1 py-3 font-pixel text-[10px] cursor-pointer ${
              activeTab === 'otp' ? 'bg-primary text-white' : 'bg-surface text-text hover:text-white'
            }`}
          >
            TELEGRAM OTP
          </button>
        </div>

        {/* Card Panel */}
        <PixelCard shadowVariant="primary" className="p-8 text-left">
          {error && (
            <div className="mb-4 p-3 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          {activeTab === 'password' ? (
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
                <PixelButton type="submit" variant="primary" className="py-3">
                  ENTER APP
                </PixelButton>
                <div className="text-center">
                  <span className="font-mono text-sm text-muted">New player? </span>
                  <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="font-pixel text-[9px] text-primary hover:underline"
                  >
                    CREATE CHARACTER
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-6">
              {!otpSent ? (
                <form onSubmit={handleGenerateOtp} className="flex flex-col gap-6">
                  <p className="font-mono text-sm text-muted mb-2">
                    Enter your phone number. We will generate a registration/login OTP code which you must send to our Telegram Bot.
                  </p>
                  <PixelInput
                    label="Phone Number"
                    placeholder="e.g., 09123456789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={11}
                  />
                  <PixelButton type="submit" variant="accent" className="py-3 text-black">
                    GENERATE OTP
                  </PixelButton>
                </form>
              ) : (
                <div className="flex flex-col gap-6 text-center">
                  <div className="border-4 border-black bg-bg p-6">
                    <span className="font-pixel text-[9px] text-muted block mb-3">YOUR SECRET OTP</span>
                    <span className="font-pixel text-4xl text-accent tracking-widest block animate-pulse">
                      {generatedOtp}
                    </span>
                  </div>

                  <div className="text-left font-mono text-sm text-muted">
                    <p className="mb-2"><b>1.</b> Open Telegram Bot: <a href="https://t.me/bumbullbot" target="_blank" className="text-primary hover:underline">@bumbullbot</a></p>
                    <p className="mb-2"><b>2.</b> Start the bot & send the 6-digit code above.</p>
                    <p><b>3.</b> Share your phone number when prompted.</p>
                  </div>

                  <a
                    href="https://t.me/bumbullbot"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-secondary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm block hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    OPEN TELEGRAM BOT
                  </a>

                  {/* Polling simulation trigger */}
                  <div className="border-t-2 border-black my-2"></div>
                  <span className="font-pixel text-[8px] text-muted block animate-pulse">POLLING TELEGRAM BOT FOR VERIFICATION...</span>
                  <PixelButton onClick={simulateOtpVerify} variant="success" className="py-3">
                    SIMULATE VERIFICATION SUCCESS
                  </PixelButton>
                  
                  <button
                    onClick={() => setOtpSent(false)}
                    className="font-pixel text-[8px] text-muted hover:underline"
                  >
                    GO BACK
                  </button>
                </div>
              )}
            </div>
          )}
        </PixelCard>
      </div>
    </div>
  );
};
