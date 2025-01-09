// src/app/dashboard/components/Sidebar.tsx
import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen px-4 py-6">
      <ul className="space-y-2">
        <li>
          <Link href="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar