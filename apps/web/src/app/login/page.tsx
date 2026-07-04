'use client';

import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    window.location.href = 'http://localhost:5173/login';
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center font-mono">
      <span className="text-muted animate-pulse font-pixel text-xs">REDIRECTING TO RETRO NETWORK...</span>
    </div>
  );
}
