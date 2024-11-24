'use client';

import Utils from '@/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signin() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function login() {
    setIsLoading(true);

    try {
      await Utils.callRestAPI({
        url: '/api/signin',
        method: 'POST',
        data: {
          username: user.username,
          password: user.password
        }
      });

      router.push('/users');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('Error in login', err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>
            <form className="mt-8 space-y-4">
              <label className="text-gray-800 text-sm mb-2 block">
                Username
              </label>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter username"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>

              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>

              <p className="text-red-500 text-sm">{error}</p>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
                  disabled={isLoading}
                  onClick={login}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                <Link
                  href="/signup"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Admin Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
