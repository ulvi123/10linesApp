'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", { email, password })
      
    } catch (error:any) {
      setError(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Register</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-bold">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-bold">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
        Register
      </button>
    </form>
  );
}
