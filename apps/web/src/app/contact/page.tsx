'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, MessageSquare, HelpCircle, Send } from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

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
        <span className="font-pixel text-xs text-accent">DATALINK CONNECTION</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-pixel text-2xl md:text-4xl text-white mb-4">CONTACT SUPPORT</h1>
          <p className="text-muted text-base">Transmit a signal to our moderators and developers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Details */}
          <div className="flex flex-col gap-6 text-left">
            <div className="bg-surface border-4 border-black p-6 shadow-pixel">
              <h3 className="font-pixel text-[10px] text-white mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" /> TELEGRAM SIGNAL
              </h3>
              <p className="text-sm text-muted mb-4 leading-relaxed">
                The fastest way to reach us or request membership rank upgrades is via our Telegram bot.
              </p>
              <a
                href="https://t.me/bumbullbot"
                target="_blank"
                className="inline-block px-4 py-2 bg-primary border-2 border-black text-white font-pixel text-[8px] shadow-pixel-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                OPEN @BUMBULLBOT
              </a>
            </div>

            <div className="bg-surface border-4 border-black p-6 shadow-pixel">
              <h3 className="font-pixel text-[10px] text-white mb-4 flex items-center gap-2">
                <Mail size={16} className="text-accent" /> EMAIL INQUIRIES
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                For administrative requests, advertising coordinates, or partnerships:
              </p>
              <span className="font-mono text-sm text-accent block mt-2 font-bold">
                support@bumbul.ir
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface border-4 border-black p-8 shadow-pixel text-left">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 bg-success border-2 border-black flex items-center justify-center text-black mx-auto mb-4 font-bold">
                  ✓
                </div>
                <h3 className="font-pixel text-xs text-white mb-2">SIGNAL TRANSMITTED</h3>
                <p className="text-sm text-muted">Moderators will parse your signal within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-pixel text-[8px] text-primary hover:underline"
                >
                  SEND ANOTHER SIGNAL
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="font-pixel text-xs text-white mb-2">TRANSMIT MASSAGE</h3>

                <div className="flex flex-col gap-2">
                  <label className="font-pixel text-[9px] text-muted">EMAIL COORDINATES</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. your@email.com"
                    className="w-full border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary placeholder:text-muted/40"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-pixel text-[9px] text-muted">SIGNAL CONTENT</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write details of your support inquiry..."
                    className="w-full h-32 border-4 border-black bg-bg p-3 font-mono text-base text-text focus:outline-none focus:border-primary resize-none placeholder:text-muted/40"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary border-4 border-black text-white font-pixel text-xs shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} /> TRANSMIT SIGNAL
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
