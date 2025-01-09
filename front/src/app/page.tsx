'use client'

import { useState } from 'react';
import Login from './(auth)/login/page';
import Register from './(auth)/register/page';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">
        Robot Parking System
      </h1>
      <div className="p-4 mt-4 bg-white rounded-md shadow-md w-96">
        {isLogin ? <Login /> : <Register />}
        <button
          className="block w-full py-2 px-4 text-center text-white bg-blue-500 hover:bg-blue-700 rounded-md mt-4"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
}
