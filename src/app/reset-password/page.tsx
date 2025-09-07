
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      setError(error.message);
      alert('Failed to send reset email. Please check the email address.');
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center mb-8">
          <div className="w-24 h-24 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover-lift">
            <span className="text-white text-3xl font-bold professional-title">MP</span>
          </div>
          <h1 className="text-4xl font-bold text-black mb-3 professional-title">Reset Password</h1>
          <p className="text-black text-xl professional-subtitle mb-2">Recover your account</p>
        </div>

        <form id="resetForm" className="space-y-4" onSubmit={handleResetPassword}>
          <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="prime-input" 
              placeholder="you@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="prime-button w-full py-3">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Remember your password?{' '}
            <Link href="/" id="loginLink" className="font-medium text-yellow-600 hover:text-yellow-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
