'use client';

import { useState } from 'react';
import { AuthForm } from '@/components/AuthForm';

export default function SignInPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="w-full max-w-md">
        <AuthForm mode={mode} onToggleMode={toggleMode} />
      </div>
    </div>
  );
}
