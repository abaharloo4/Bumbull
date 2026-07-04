'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Check, Star } from 'lucide-react';

export default function MembershipPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white font-mono antialiased overflow-x-hidden p-6 md:p-12">
      {/* Header back */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between border-b-4 border-black pb-4">
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 border-4 border-black bg-surface hover:bg-bg text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
        >
          ◄ BACK TO HOME
        </button>
        <span className="font-pixel text-xs text-accent">MEMBERSHIP TIERS</span>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-pixel text-2xl md:text-4xl text-white mb-4">MEMBERSHIP PLANS</h1>
          <p className="text-muted text-base">Select your tier to gain swipe privileges and statistics boost</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Bronze Tier */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel flex flex-col justify-between">
            <div>
              <span className="font-pixel text-[9px] text-muted block mb-2">TIER 01</span>
              <h3 className="font-pixel text-lg text-white mb-4">BRONZE</h3>
              <div className="font-pixel text-2xl text-accent mb-6">FREE</div>
              <div className="border-t-2 border-black my-4"></div>
              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> 50 Likes per day
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> 1 Super Like per day
                </li>
                <li className="flex items-center gap-2 line-through text-red-500">
                  No priority match signal
                </li>
                <li className="flex items-center gap-2 line-through text-red-500">
                  Default profile border
                </li>
              </ul>
            </div>
            <button
              onClick={() => router.push('/register')}
              className="mt-8 w-full py-3 bg-secondary border-4 border-black text-white font-pixel text-[10px] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              GET FREE RANK
            </button>
          </div>

          {/* Silver Tier */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel flex flex-col justify-between relative transform md:-translate-y-2 border-primary border-4">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary border-4 border-black text-white font-pixel text-[8px] px-3 py-1 shadow-pixel-sm">
              RECOMMENDED
            </div>
            <div>
              <span className="font-pixel text-[9px] text-primary block mb-2 mt-2">TIER 02</span>
              <h3 className="font-pixel text-lg text-white mb-4">SILVER</h3>
              <div className="font-pixel text-2xl text-accent mb-6">UPGRADE</div>
              <div className="border-t-2 border-black my-4"></div>
              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> 150 Likes per day
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> 3 Super Likes per day
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> Silver profile tag badge
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> Boost invite multiplier
                </li>
              </ul>
            </div>
            <a
              href="https://t.me/bumbullbot"
              target="_blank"
              className="mt-8 w-full py-3 bg-primary border-4 border-black text-white font-pixel text-[10px] shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              CONTACT BOT
            </a>
          </div>

          {/* Gold Tier */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel-accent flex flex-col justify-between border-accent border-4">
            <div>
              <span className="font-pixel text-[9px] text-accent block mb-2">TIER 03</span>
              <h3 className="font-pixel text-lg text-accent mb-4">GOLD</h3>
              <div className="font-pixel text-2xl text-white mb-6">ELITE</div>
              <div className="border-t-2 border-black my-4"></div>
              <ul className="space-y-4 text-sm text-muted">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> Unlimited Likes per day
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> 5 Super Likes per day
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> Gold profile frame layout
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-success" /> Priority coordinate match
                </li>
              </ul>
            </div>
            <a
              href="https://t.me/bumbullbot"
              target="_blank"
              className="mt-8 w-full py-3 bg-accent border-4 border-black text-black font-pixel text-[10px] shadow-pixel-sm block text-center hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              CONTACT BOT
            </a>
          </div>
        </div>

        {/* Notice Info */}
        <div className="mt-12 border-4 border-black bg-surface p-6 flex gap-4 items-center max-w-3xl mx-auto text-left">
          <div className="w-10 h-10 bg-accent border-2 border-black flex items-center justify-center text-black shrink-0">
            <Star size={20} className="fill-current" />
          </div>
          <p className="text-xs text-muted leading-relaxed">
            All upgrade actions are validated and approved programmatically by the administrators. Please contact @bumbullbot or administrators to request tier modifications.
          </p>
        </div>
      </div>
    </div>
  );
}
