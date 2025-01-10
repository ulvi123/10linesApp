"use client"

// components/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className='flex flex-col gap-2'>
        <label htmlFor="email" className='font-bold'>Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='border border-gray-300 rounded-md p-2'
          placeholder='Email'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="password" className='font-bold'>Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='border border-gray-300 rounded-md p-2'
          placeholder='Password'
        />
      </div>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Login
      </button>
    </form>
  );
};

export default Login;