'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, EyeOff, Lock } from 'lucide-react';

export default function PrivacyPage() {
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
        <span className="font-pixel text-xs text-[#f43f5e]">SECURITY PROTOCOL</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-pixel text-2xl md:text-4xl text-white mb-4">PRIVACY POLICY</h1>
          <p className="text-muted text-base">Your datacard security details and signal encryption rules</p>
        </div>

        <div className="bg-surface border-4 border-black p-8 shadow-pixel text-left flex flex-col gap-8">
          <div>
            <h3 className="font-pixel text-xs text-white mb-3 flex items-center gap-2">
              <Lock size={14} className="text-primary" /> 1. SECURITY & LOGS
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              We encrypt passwords and secure phone numbers. Your phone number is strictly used for identification, login verification, and to link with @bumbullbot. We never display phone identifiers to other candidates.
            </p>
          </div>

          <div className="border-t-2 border-black"></div>

          <div>
            <h3 className="font-pixel text-xs text-white mb-3 flex items-center gap-2">
              <EyeOff size={14} className="text-accent" /> 2. COORDINATES & RADIUS
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              While we display current cities (Tehran, Shiraz, Isfahan, Gorgan) and calculate relative distances, we never store or display exact latitude and longitude values to public users. Exact coordinates are scrambled to prevent precise location tracking.
            </p>
          </div>

          <div className="border-t-2 border-black"></div>

          <div>
            <h3 className="font-pixel text-xs text-white mb-3 flex items-center gap-2">
              <ShieldAlert size={14} className="text-success" /> 3. PHOTO RETENTION
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Selfie photos uploaded for finger-count verification are stored in isolated admin storage. These verification photos are purged automatically once the account is approved and verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
