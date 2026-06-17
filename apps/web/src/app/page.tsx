'use client';

import React, { useEffect, useState } from 'react';
import { Heart, MessageSquare, Users, Zap, Check, ExternalLink } from 'lucide-react';

interface HeartConfig {
  id: number;
  left: number;
  delay: number;
  size: number;
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [hearts, setHearts] = useState<HeartConfig[]>([]);
  const registerUrl = '/register';

  useEffect(() => {
    const configs = [...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: i * 0.7,
      size: 16 + Math.random() * 24,
    }));
    const timer = setTimeout(() => {
      setHearts(configs);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white font-mono antialiased overflow-x-hidden">
      {/* Animated Pixel Hearts CSS Background */}
      <style jsx global>{`
        @keyframes float-heart {
          0% {
            transform: translateY(105vh) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 1s steps(2, start) infinite;
        }
        .floating-heart {
          position: absolute;
          bottom: -50px;
          color: #e94560;
          pointer-events: none;
          animation: float-heart 8s linear infinite;
        }
      `}</style>

      {/* Floating Hearts Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {hearts.map((heart) => {
          return (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
                fontSize: `${heart.size}px`,
                fontFamily: 'monospace'
              }}
            >
              ❤️
            </div>
          );
        })}
      </div>


      {/* Navigation Bar */}
      <header className="relative z-10 border-b-4 border-black bg-surface px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-lg shadow-pixel-sm">
            B
          </div>
          <span className="font-pixel text-xl text-white tracking-wider">BUMBUL</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 font-pixel text-xs">
          <a href="/features" className="hover:text-primary transition-colors">FEATURES</a>
          <a href="/membership" className="hover:text-primary transition-colors">MEMBERSHIP</a>
          <a href="/how-it-works" className="hover:text-primary transition-colors">HOW IT WORKS</a>
        </nav>
        <div className="flex gap-4">
          <a
            href="/login"
            className="px-4 py-2 bg-secondary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-opacity-90 transition-all block"
          >
            LOGIN
          </a>
          <a
            href={registerUrl}
            className="px-4 py-2 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-opacity-90 transition-all block"
          >
            PLAY NOW
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Retro Mascot Frame */}
          <div className="w-32 h-32 mb-8 bg-surface border-4 border-black p-1 shadow-pixel relative">
            <div className="w-full h-full bg-secondary flex items-center justify-center text-5xl animate-bounce">
              👾
            </div>
            <div className="absolute -top-3 -right-3 bg-accent text-black font-pixel text-[10px] px-2 py-0.5 border-2 border-black">
              LIVE
            </div>
          </div>

          <h1 className="font-pixel text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 tracking-wide drop-shadow-md">
            FIND YOUR <span className="text-primary">MATCH</span>
            <span className="text-primary blinking-cursor">_</span>
          </h1>

          <p className="font-mono text-xl md:text-2xl text-muted max-w-2xl mb-12">
            Iran&apos;s first pixel-art dating experience. Swipe, match, and chat in a 16-bit digital world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center px-4 max-w-md">
            <a
              href={registerUrl}
              className="flex-1 py-4 bg-primary border-4 border-black text-white font-pixel text-sm shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center"
            >
              START SWIPING
            </a>
            <a
              href="#features"
              className="flex-1 py-4 bg-secondary border-4 border-black text-white font-pixel text-sm shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center"
            >
              LEARN MORE
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 border-t-4 border-black bg-surface px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-pixel text-2xl md:text-4xl text-white mb-4">GAME FEATURES</h2>
            <div className="w-32 h-2 bg-primary mx-auto border-2 border-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-bg border-4 border-black p-8 shadow-pixel hover:-translate-y-2 transition-transform">
              <div className="w-14 h-14 bg-primary border-4 border-black flex items-center justify-center text-white mb-6 shadow-pixel-sm">
                <Heart size={28} />
              </div>
              <h3 className="font-pixel text-lg text-white mb-4">SWIPE & MATCH</h3>
              <p className="font-mono text-muted text-base leading-relaxed">
                Drag cards right to LIKE or left to PASS. Experience classic matching mechanics styled with pixel perfection.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-bg border-4 border-black p-8 shadow-pixel hover:-translate-y-2 transition-transform">
              <div className="w-14 h-14 bg-secondary border-4 border-black flex items-center justify-center text-white mb-6 shadow-pixel-sm">
                <MessageSquare size={28} />
              </div>
              <h3 className="font-pixel text-lg text-white mb-4">REAL-TIME CHAT</h3>
              <p className="font-mono text-muted text-base leading-relaxed">
                Instantly chat with your matches via real-time WebSockets. Send texts and make genuine connections.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-bg border-4 border-black p-8 shadow-pixel hover:-translate-y-2 transition-transform">
              <div className="w-14 h-14 bg-accent border-4 border-black flex items-center justify-center text-black mb-6 shadow-pixel-sm">
                <Users size={28} />
              </div>
              <h3 className="font-pixel text-lg text-white mb-4">INVITE & EARN</h3>
              <p className="font-mono text-muted text-base leading-relaxed">
                Share your unique invite code with friends to unlock special membership tiers and increase your swipe quotas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section id="pricing" className="relative z-10 border-t-4 border-black bg-bg px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-pixel text-2xl md:text-4xl text-white mb-4">MEMBERSHIP TIERS</h2>
            <p className="font-mono text-lg text-muted">Upgrade your account to get more action</p>
            <div className="w-32 h-2 bg-primary mx-auto border-2 border-black mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Bronze Tier */}
            <div className="bg-surface border-4 border-black p-8 shadow-pixel flex flex-col justify-between">
              <div>
                <span className="font-pixel text-xs text-muted block mb-2">TIER 01</span>
                <h3 className="font-pixel text-xl text-white mb-6">BRONZE</h3>
                <div className="font-pixel text-3xl text-white mb-8">
                  FREE
                </div>
                <div className="border-t-2 border-black my-6"></div>
                <ul className="space-y-4 font-mono text-base text-muted">
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> 50 Swipes / Day
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> 1 Super Like / Day
                  </li>
                  <li className="flex items-center gap-3 text-red-500 line-through">
                    No profile boost
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a
                  href={registerUrl}
                  className="w-full py-3 bg-secondary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                >
                  DEFAULT BUILD
                </a>
              </div>
            </div>

            {/* Silver Tier */}
            <div className="bg-surface border-4 border-black p-8 shadow-pixel flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary border-4 border-black text-white font-pixel text-[10px] px-3 py-1 shadow-pixel-sm">
                POPULAR
              </div>
              <div>
                <span className="font-pixel text-xs text-primary block mb-2 mt-2">TIER 02</span>
                <h3 className="font-pixel text-xl text-white mb-6">SILVER</h3>
                <div className="font-pixel text-3xl text-white mb-8">
                  UPGRADE
                </div>
                <div className="border-t-2 border-black my-6"></div>
                <ul className="space-y-4 font-mono text-base text-muted">
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> 150 Swipes / Day
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> 3 Super Likes / Day
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> Custom Badge Highlight
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a
                  href="t.me/bumbullbot"
                  target="_blank"
                  className="w-full py-3 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                >
                  CONTACT ADMIN
                </a>
              </div>
            </div>

            {/* Gold Tier */}
            <div className="bg-surface border-4 border-black p-8 shadow-pixel-accent flex flex-col justify-between border-accent border-4">
              <div>
                <span className="font-pixel text-xs text-accent block mb-2">TIER 03</span>
                <h3 className="font-pixel text-xl text-accent mb-6">GOLD</h3>
                <div className="font-pixel text-3xl text-white mb-8">
                  ELITE
                </div>
                <div className="border-t-2 border-black my-6"></div>
                <ul className="space-y-4 font-mono text-base text-muted">
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> Unlimited Swipes
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> 5 Super Likes / Day
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> Gold Profile Frame
                  </li>
                  <li className="flex items-center gap-3">
                    <Check size={16} className="text-success" /> Priority Matching
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a
                  href="t.me/bumbullbot"
                  target="_blank"
                  className="w-full py-3 bg-accent border-4 border-black text-black font-pixel text-xs shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                >
                  CONTACT ADMIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 border-t-4 border-black bg-surface px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-pixel text-2xl md:text-4xl text-white mb-4">HOW IT WORKS</h2>
            <div className="w-32 h-2 bg-primary mx-auto border-2 border-black"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-bg border-4 border-black p-6 relative">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold shadow-pixel-sm">
                1
              </div>
              <h3 className="font-pixel text-sm text-white mb-3 mt-4">REGISTER</h3>
              <p className="font-mono text-muted text-sm leading-relaxed">
                Enter your basic details on our registration portal to initiate the account creation process.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-bg border-4 border-black p-6 relative">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-secondary border-4 border-black flex items-center justify-center text-white font-pixel font-bold shadow-pixel-sm">
                2
              </div>
              <h3 className="font-pixel text-sm text-white mb-3 mt-4">VERIFY VIA TELEGRAM</h3>
              <p className="font-mono text-muted text-sm leading-relaxed">
                Send the generated OTP to @bumbullbot to link and verify your phone number.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-bg border-4 border-black p-6 relative">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-accent border-4 border-black flex items-center justify-center text-black font-pixel font-bold shadow-pixel-sm">
                3
              </div>
              <h3 className="font-pixel text-sm text-white mb-3 mt-4">BUILD PROFILE</h3>
              <p className="font-mono text-muted text-sm leading-relaxed">
                Upload at least 3 photos, choose your interests, and set up your profile biography.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-bg border-4 border-black p-6 relative">
              <div className="absolute -top-6 left-6 w-12 h-12 bg-success border-4 border-black flex items-center justify-center text-black font-pixel font-bold shadow-pixel-sm">
                4
              </div>
              <h3 className="font-pixel text-sm text-white mb-3 mt-4">START SWIPING</h3>
              <p className="font-mono text-muted text-sm leading-relaxed">
                Once approved by admins, dive in and start matching with other users nearby!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Invite & Referral Section */}
      <section className="relative z-10 border-t-4 border-black bg-bg px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto border-4 border-black bg-surface p-12 shadow-pixel">
          <div className="w-16 h-16 bg-accent border-4 border-black flex items-center justify-center text-black mx-auto mb-6 shadow-pixel-sm">
            <Zap size={32} />
          </div>
          <h2 className="font-pixel text-xl md:text-3xl text-white mb-6">INVITE FRIENDS & GET BOOST</h2>
          <p className="font-mono text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Every user gets a unique referral code. When a new user signs up with your invite code, your match compatibility rankings and quotas increase. Get sharing!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="text"
              readOnly
              value="BUMBUL-REFERRAL-BOT"
              className="w-full sm:flex-1 py-3 px-4 border-4 border-black bg-bg text-accent font-pixel text-xs text-center focus:outline-none"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText('BUMBUL-REFERRAL-BOT');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="w-full sm:w-auto py-3 px-6 bg-accent border-4 border-black text-black font-pixel text-xs shadow-pixel-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-opacity-90 transition-all"
            >
              {copied ? 'COPIED!' : 'COPY CODE'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-black bg-surface px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold text-sm">
              B
            </div>
            <span className="font-pixel text-sm text-white">BUMBUL PROJECT</span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 font-pixel text-[10px]">
            <a href="/about" className="hover:text-primary transition-colors">ABOUT US</a>
            <a href="/privacy" className="hover:text-primary transition-colors">PRIVACY POLICY</a>
            <a href="/contact" className="hover:text-primary transition-colors">CONTACT SUPPORT</a>
          </div>

          <div className="font-mono text-sm text-muted">
            Telegram Bot: <a href="https://t.me/bumbullbot" target="_blank" className="text-primary hover:underline inline-flex items-center gap-1">@bumbullbot <ExternalLink size={12} /></a>
          </div>
        </div>
        <div className="text-center font-mono text-xs text-muted mt-8 border-t-2 border-black pt-6 max-w-6xl mx-auto">
          © {new Date().getFullYear()} Bumbul. All rights reserved. Powered by pixel art & love.
        </div>
      </footer>
    </div>
  );
}
