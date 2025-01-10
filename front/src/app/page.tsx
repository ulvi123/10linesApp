// app/page.tsx
'use client'

import { useState } from 'react';
import Login from './(auth)/login/page';
import Register from './(auth)/register/page';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold mb-8 text-gray-800">
        Robot Parking System
      </h1>
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        {isLogin ? <Login /> : <Register />}
        <button
          className="block w-full py-2 px-4 text-center text-white bg-gray-500 hover:bg-gray-700 rounded-md mt-4"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
}