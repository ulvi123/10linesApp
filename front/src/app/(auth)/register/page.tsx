"use client"

// components/Register.tsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await register(email, password);
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>Register</h2>
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
      <div className='flex flex-col gap-2'>
        <label htmlFor="confirmPassword" className='font-bold'>Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='border border-gray-300 rounded-md p-2'
          placeholder='Confirm Password'
        />
      </div>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Register
      </button>
    </form>
  );
};

export default Register;