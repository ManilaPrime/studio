
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col mx-auto">
      <div className="flex-1 flex flex-col justify-center p-6 max-w-sm w-full self-center">
        <div className="text-center mb-8">
          <div className="w-24 h-24 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover-lift">
            <span className="text-white text-3xl font-bold professional-title">MP</span>
          </div>
          <h1 className="text-4xl font-bold text-black mb-3 professional-title">Create Account</h1>
          <p className="text-black text-xl professional-subtitle mb-2">Join Manila Prime</p>
        </div>

        <form id="registerForm" className="space-y-4" onSubmit={handleRegister}>
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

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="prime-input" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <div>
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              className="prime-input" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="prime-button w-full py-3">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/" id="loginLink" className="font-medium text-yellow-600 hover:text-yellow-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
