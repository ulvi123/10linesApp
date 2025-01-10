"use client"

// components/Header.tsx
import React from 'react';
import Image from 'next/image';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { isAuthed, user, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="https://i.fbcd.co/products/resized/resized-750-500/2-32-150a72841bd2dd850cdd250ee6630390da54f2b3d965ba0a3a13ba49b47cfb57.jpg" alt="Logo" width={40} height={40} />
          <h1 className="ml-3 text-2xl font-bold text-gray-900">Robot Parking System</h1>
        </div>
        <div className="flex items-center">
          {isAuthed && user && (
            <>
              <span className="text-gray-700 mr-4">{user.name}</span>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;