'use client';

import { useRouter } from 'next/navigation'; // Use next/navigation in Next.js 13+ for client-side routing
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login (replace with real authentication logic as needed)
    if (username === 'user' && password === 'password') {
      router.push('/dashboard'); // Navigate to the dashboard
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-white bg-gray-700"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white bg-gray-700"
            required
          />
          <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-600">
            Login
          </Button>
        </form>
        {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      </div>
    </div>
  );
}
