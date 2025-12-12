import React, { useState } from 'react';

interface LoginProps {
  onLogin: (name: string, email: string) => void;
  onCancel: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError("Please fill in all fields");
      return;
    }
    // Simulate API call
    onLogin(name, email);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 bg-[length:400%_400%] animate-gradient-bg"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up mx-4 border border-white/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary to-slate-800 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 backdrop-blur-sm border border-white/10">
               <i className="fa-solid fa-bolt text-primary text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">ElectroTech</h2>
            <p className="text-indigo-200 mt-2 text-sm font-light uppercase tracking-wider">Welcome Back</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-center">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                <i className="fa-regular fa-user text-gray-400 group-focus-within:text-primary"></i>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                <i className="fa-regular fa-envelope text-gray-400 group-focus-within:text-primary"></i>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-gray-50 focus:bg-white"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              className="w-full py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/30 text-sm font-bold text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:-translate-y-0.5 transition-all"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none"
            >
              Continue as Guest
            </button>
          </div>
        </form>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Secure Login • Demo Access Enabled
          </p>
        </div>
      </div>
    </div>
  );
};