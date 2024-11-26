'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Utils from '@/utils/utils';
import { ADMIN_SIGN_UP_URL } from '@/constants/api';
import Input from '@/components/Input';

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
        url: ADMIN_SIGN_UP_URL,
        method: 'POST',
        data: {
          username,
          password,
          roleId: 1
        }
      });

      router.push('/');

      toast.success('Signup success');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
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
              <p className="text-gray-800 text-sm mb-2 block">Username</p>
              <div className="relative flex items-center">
                <Input
                  name="username"
                  type="text"
                  required
                  placeholder="Enter user name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <p className="text-gray-800 text-sm mb-2 block">Password</p>
              <div className="relative flex items-center">
                <Input
                  name="password"
                  type="password"
                  required
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
            <p className="text-gray-800 text-sm !mt-8 text-center">
              <Link
                href="/signin"
                className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
