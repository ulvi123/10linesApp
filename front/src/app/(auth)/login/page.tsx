"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import React from 'react'
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password })
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        router.push("/dashboard");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (error) {
      setError("Invalid email or password")
    }
  }


  return (
    <div>
      <form onSubmit={handleLogin} className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='font-bold'>Email:</label>
          <input
            placeholder='email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='border border-gray-300 rounded-md p-2'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className='font-bold'>Password</label>
          <input
            placeholder='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='border border-gray-300 rounded-md p-2'
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login
