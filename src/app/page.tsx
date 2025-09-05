'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation for demo
        const email = (e.target as HTMLFormElement).loginEmail.value;
        const password = (e.target as HTMLFormElement).loginPassword.value;

        if (email === 'primestaycation24@gmail.com' && password === 'Prime2025') {
            router.push('/dashboard');
        } else {
            alert('Invalid credentials. Please use the demo credentials provided.');
        }
    };

    const quickLogin = () => {
        // In a real app, you wouldn't hardcode credentials like this.
        router.push('/dashboard');
    }

  return (
    <main className="min-h-screen bg-white flex flex-col max-w-sm mx-auto">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center p-6">
          <div className="text-center mb-8">
              <div className="w-24 h-24 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover-lift">
                  <span className="text-white text-3xl font-bold professional-title">MP</span>
              </div>
              <h1 className="text-4xl font-bold text-black mb-3 professional-title">Manila Prime</h1>
              <p className="text-black text-xl professional-subtitle mb-2">Management App</p>
              <p className="text-gray-600 text-sm professional-subtitle">Professional Property Management System</p>
          </div>
          
          <form id="loginForm" className="space-y-4" onSubmit={handleLogin}>
              <div>
                  <input type="email" id="loginEmail" name="loginEmail" className="prime-input" placeholder="Email address" defaultValue="primestaycation24@gmail.com" />
              </div>
              
              <div>
                  <input type="password" id="loginPassword" name="loginPassword" className="prime-input" placeholder="Password" defaultValue="Prime2025" />
              </div>
              
              <button type="submit" className="prime-button w-full py-3">
                  Log In
              </button>
          </form>
          
          <div className="mt-6">
              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
              </div>
              
              <button type="button" onClick={quickLogin} className="mt-4 w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Quick Demo Login
              </button>
          </div>
      </div>
      
      {/* Footer */}
      <div className="p-6 border-t border-yellow-400 bg-yellow-100">
          <div className="text-center text-sm text-black">
              <p className="font-semibold mb-2">Demo Credentials:</p>
              <p>📧 primestaycation24@gmail.com</p>
              <p>🔑 Prime2025</p>
          </div>
      </div>
    </main>
  );
}
