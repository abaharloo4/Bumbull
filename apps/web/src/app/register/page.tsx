'use client';

import { useEffect } from 'react';

export default function RegisterPage() {
  useEffect(() => {
    window.location.href = 'http://localhost:5173/register';
  }, []);

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center font-mono">
      <span className="text-muted animate-pulse font-pixel text-xs">REDIRECTING TO CHARACTER CREATOR...</span>
    </div>
  );
}
