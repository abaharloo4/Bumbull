'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white font-mono antialiased overflow-x-hidden p-6 md:p-12">
      {/* Header back */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between border-b-4 border-black pb-4">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 border-4 border-black bg-surface hover:bg-bg text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
        >
          ◄ BACK TO HOME
        </button>
        <span className="font-pixel text-xs text-accent">ABOUT OUR MISSION</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-pixel text-2xl md:text-4xl text-white mb-4">ABOUT BUMBUL</h1>
          <p className="text-muted text-base">Iran&apos;s first retro 16-bit dating and social coordinates network</p>
        </div>

        <PixelCardComponent>
          <h2 className="font-pixel text-sm text-white mb-4">OUR STORY</h2>
          <p className="text-sm text-muted leading-relaxed mb-6">
            Bumbul was created out of a desire to break away from standard, boring social cards. By introducing a visual design system themed around classic pixel art, gaming, and 16-bit console aesthetics, we offer an Iranian matching portal that feels like playing an arcade game.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            The platform combines modern Django backend endpoints with optimized Next.js/React layouts, providing verified phone registration through native Telegram integration to secure a clean environment for all players.
          </p>
        </PixelCardComponent>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-surface border-4 border-black p-6 shadow-pixel text-left">
            <div className="w-10 h-10 bg-primary border-2 border-black flex items-center justify-center text-white mb-4">
              <Heart size={20} />
            </div>
            <h3 className="font-pixel text-[10px] text-white mb-2">GENUINE SIGNALS</h3>
            <p className="text-xs text-muted leading-relaxed">
              We focus on building mutual likes and real conversation logs, rather than empty swipes.
            </p>
          </div>

          <div className="bg-surface border-4 border-black p-6 shadow-pixel text-left">
            <div className="w-10 h-10 bg-secondary border-2 border-black flex items-center justify-center text-white mb-4">
              <Compass size={20} />
            </div>
            <h3 className="font-pixel text-[10px] text-white mb-2">EXPLORATION</h3>
            <p className="text-xs text-muted leading-relaxed">
              Browse candidate grids based on cities (Tehran, Shiraz, Isfahan, Gorgan) and filter by specific coordinates.
            </p>
          </div>

          <div className="bg-surface border-4 border-black p-6 shadow-pixel text-left">
            <div className="w-10 h-10 bg-success border-2 border-black flex items-center justify-center text-black mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-pixel text-[10px] text-white mb-2">SECURITY FIRST</h3>
            <p className="text-xs text-muted leading-relaxed">
              All registrations are verified using OTP via @bumbullbot, supplemented by manual selfie finger checks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline Pixel Card mock for Next.js layout
function PixelCardComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface border-4 border-black p-8 shadow-pixel text-left">
      {children}
    </div>
  );
}
