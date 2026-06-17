'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageSquare, Users, Zap, Shield, Sparkles } from 'lucide-react';

export default function FeaturesPage() {
  const router = useRouter();
  const registerUrl = '/register';

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white font-mono antialiased overflow-x-hidden p-6 md:p-12">
      {/* Header back navigation */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between border-b-4 border-black pb-4">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 border-4 border-black bg-surface hover:bg-bg text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
        >
          ◄ BACK TO HOME
        </button>
        <span className="font-pixel text-xs text-accent">SYSTEM FEATURES</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-pixel text-2xl md:text-4xl text-white mb-4">GAMEPLAY FEATURES</h1>
          <p className="text-muted text-base">Unleash the full capability of Bumbul retro dating network</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel">
            <div className="w-12 h-12 bg-primary border-4 border-black flex items-center justify-center text-white mb-6">
              <Heart size={24} />
            </div>
            <h3 className="font-pixel text-sm text-white mb-3">16-BIT SWIPING MATCH</h3>
            <p className="text-sm text-muted leading-relaxed">
              Experience swiping cards recreated with retro aesthetic. Drag cards left to reject or right to like. When two players like each other, a direct signal is established!
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel">
            <div className="w-12 h-12 bg-secondary border-4 border-black flex items-center justify-center text-white mb-6">
              <MessageSquare size={24} />
            </div>
            <h3 className="font-pixel text-sm text-white mb-3">CHANNELS CHAT SYSTEM</h3>
            <p className="text-sm text-muted leading-relaxed">
              Once you lock in a match, connect immediately using real-time websocket chat. Share messages, check online presence indicators, and maintain signals.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel">
            <div className="w-12 h-12 bg-accent border-4 border-black flex items-center justify-center text-black mb-6">
              <Users size={24} />
            </div>
            <h3 className="font-pixel text-sm text-white mb-3">INVITATION SYSTEM</h3>
            <p className="text-sm text-muted leading-relaxed">
              Redeem friend invite codes to boost your account rank from Bronze to Silver tier. Increase your daily swipe limits and increase signal compatibility.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel">
            <div className="w-12 h-12 bg-[#a855f7] border-4 border-black flex items-center justify-center text-white mb-6">
              <Sparkles size={24} />
            </div>
            <h3 className="font-pixel text-sm text-white mb-3">GOLD MEMBERSHIP</h3>
            <p className="text-sm text-muted leading-relaxed">
              Contact our moderators to unlock Gold rank. Gain access to unlimited swipes, priority signal queues, and specialized profile badges.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel">
            <div className="w-12 h-12 bg-success border-4 border-black flex items-center justify-center text-black mb-6">
              <Shield size={24} />
            </div>
            <h3 className="font-pixel text-sm text-white mb-3">SELFIE VERIFICATION</h3>
            <p className="text-sm text-muted leading-relaxed">
              Submit a verification selfie to the bot displaying a random finger-count. Our admins verify all selfies within 24 hours to secure absolute platform purity.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel">
            <div className="w-12 h-12 bg-[#3b82f6] border-4 border-black flex items-center justify-center text-white mb-6">
              <Zap size={24} />
            </div>
            <h3 className="font-pixel text-sm text-white mb-3">GPS LOCATION RADIUS</h3>
            <p className="text-sm text-muted leading-relaxed">
              Locate users based on current coordinate distances. Filter candidates based on radius and find matching signals within your proximity.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-4 border-black bg-surface p-10 shadow-pixel">
          <h2 className="font-pixel text-lg text-white mb-4">READY TO START?</h2>
          <p className="text-muted text-sm mb-8 max-w-lg mx-auto">Create your character now and join the retro digital network in Iran.</p>
          <button
            onClick={() => router.push(registerUrl)}
            className="px-8 py-4 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            CREATE CHARACTER
          </button>
        </div>
      </div>
    </div>
  );
}
