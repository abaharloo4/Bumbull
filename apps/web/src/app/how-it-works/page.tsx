'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, Shield, Edit3, Sparkles } from 'lucide-react';

export default function HowItWorksPage() {
  const router = useRouter();

  const steps = [
    {
      num: 1,
      title: 'REGISTER CHARACTER',
      icon: <Smartphone size={24} />,
      desc: 'Fill in your basic information such as first name, gender, birth date, and password coordinates.'
    },
    {
      num: 2,
      title: 'TELEGRAM SYNC',
      icon: <Shield size={24} />,
      desc: 'Send the secret 6-digit OTP code to @bumbullbot and verify your phone contact directly via Telegram.'
    },
    {
      num: 3,
      title: 'BUILD PROFILE',
      icon: <Edit3 size={24} />,
      desc: 'Upload at least 3 photos, select at least 3 interest tag statistics, and write your biography details.'
    },
    {
      num: 4,
      title: 'START MATCHING',
      icon: <Sparkles size={24} />,
      desc: 'Once approved by moderators, drag cards right to like or left to pass. Unlock signals and chat!'
    }
  ];

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
        <span className="font-pixel text-xs text-accent">OPERATION FLOW</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-pixel text-2xl md:text-4xl text-white mb-4">HOW IT WORKS</h1>
          <p className="text-muted text-base">Follow these 4 simple steps to initialize your Bumbul account</p>
        </div>

        <div className="flex flex-col gap-12">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-surface border-4 border-black p-8 shadow-pixel flex flex-col md:flex-row gap-6 items-start relative"
            >
              {/* Step number badge */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary border-4 border-black flex items-center justify-center text-white font-pixel font-bold shadow-pixel-sm">
                {step.num}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 bg-secondary border-4 border-black flex items-center justify-center text-white shrink-0 shadow-pixel-sm mt-2 md:mt-0">
                {step.icon}
              </div>

              {/* Text metadata */}
              <div className="text-left">
                <h3 className="font-pixel text-sm text-white mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => router.push('/register')}
            className="px-8 py-4 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pixel-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            START STEP 1 NOW
          </button>
        </div>
      </div>
    </div>
  );
}
