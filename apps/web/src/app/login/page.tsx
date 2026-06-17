'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError('Phone number is required');
    if (!password) return setError('Password is required');

    // Save to shared localhost cookie for cross-port mockup sync
    document.cookie = `mock_logged_in=true; path=/; max-age=86400`;
    document.cookie = `mock_phone_number=${encodeURIComponent(phone)}; path=/; max-age=86400`;
    // Also clear any previous registration data so it loads default mock profile matching phone
    document.cookie = "mock_user_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Success, redirect to React SPA dashboard
    window.location.href = 'http://localhost:5173/swipe';
  };

  const handleGenerateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return setError('Phone number is required');

    // Mock generating a 6-digit OTP code
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(mockOtp);
    setOtpSent(true);
    setError('');
  };

  const simulateOtpVerify = () => {
    // Save to shared localhost cookie for cross-port mockup sync
    document.cookie = `mock_logged_in=true; path=/; max-age=86400`;
    document.cookie = `mock_phone_number=${encodeURIComponent(phone)}; path=/; max-age=86400`;
    // Also clear any previous registration data so it loads default mock profile matching phone
    document.cookie = "mock_user_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    window.location.href = 'http://localhost:5173/swipe';
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 py-8 font-mono select-none">
      <div className="w-full max-w-md relative z-10">
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-3 mb-8 cursor-pointer" onClick={() => router.push('/')}>
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
        <div className="bg-surface border-4 border-black p-8 shadow-pixel text-left">
          {error && (
            <div className="mb-4 p-3 border-4 border-black bg-red-500/10 text-[#f43f5e] font-pixel text-[9px]">
              ERROR: {error.toUpperCase()}
            </div>
          )}

          {activeTab === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-pixel text-[10px] text-muted">PHONE NUMBER</label>
                <input
                  required
                  placeholder="e.g. 09123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={11}
                  className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-pixel text-[10px] text-muted">PASSWORD</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                />
              </div>
              <div className="mt-4 flex flex-col gap-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                >
                  ENTER APP
                </button>
                <div className="text-center">
                  <span className="font-mono text-sm text-muted">New player? </span>
                  <button
                    type="button"
                    onClick={() => router.push('/register')}
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
                  <div className="flex flex-col gap-2 w-full">
                    <label className="font-pixel text-[10px] text-muted">PHONE NUMBER</label>
                    <input
                      required
                      placeholder="e.g. 09123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={11}
                      className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-accent border-4 border-black text-black font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                  >
                    GENERATE OTP
                  </button>
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
                    className="w-full py-3 bg-secondary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    OPEN TELEGRAM BOT
                  </a>

                  {/* Polling simulation trigger */}
                  <div className="border-t-2 border-black my-2"></div>
                  <span className="font-pixel text-[8px] text-muted block animate-pulse">POLLING TELEGRAM BOT FOR VERIFICATION...</span>
                  <button
                    onClick={simulateOtpVerify}
                    className="w-full py-3 bg-success border-4 border-black text-black font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
                  >
                    SIMULATE VERIFICATION SUCCESS
                  </button>
                  
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
        </div>
      </div>
    </div>
  );
}
