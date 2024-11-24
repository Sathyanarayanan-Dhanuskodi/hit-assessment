'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Utils from '@/utils/utils';

function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function createAccount() {
    setIsLoading(true);

    try {
      await Utils.callRestAPI({
        url: '/api/admins/signup',
        method: 'POST',
        data: {
          username,
          password,
          roleId: 1
        }
      });

      router.push('/');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
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
              Admin Signup
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
                  placeholder="Enter user name"
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <p className="text-red-500 text-sm">{error}</p>

              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
                  onClick={createAccount}
                  disabled={isLoading}>
                  {!isLoading ? 'Create account' : 'Creating...'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
