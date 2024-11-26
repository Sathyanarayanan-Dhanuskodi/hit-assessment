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
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

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

      setTimeout(() => {
        router.push('/');
      }, 1000);

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
                  type={isPasswordOpen ? 'text' : 'password'}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <button
                  className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                  type="button"
                  onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
                  {isPasswordOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M6.301 15.577C4.778 14.268 3.691 12.773 3.18 12c.51-.773 1.598-2.268 3.121-3.577C7.874 7.072 9.816 6 12 6s4.126 1.072 5.699 2.423c1.523 1.309 2.61 2.804 3.121 3.577-.51.773-1.598 2.268-3.121 3.577C16.126 16.928 14.184 18 12 18s-4.126-1.072-5.699-2.423M12 4C9.148 4 6.757 5.395 4.998 6.906c-1.765 1.517-2.99 3.232-3.534 4.064a1.88 1.88 0 0 0 0 2.06c.544.832 1.769 2.547 3.534 4.064C6.758 18.605 9.148 20 12 20s5.243-1.395 7.002-2.906c1.765-1.517 2.99-3.232 3.534-4.064.411-.628.411-1.431 0-2.06-.544-.832-1.769-2.547-3.534-4.064C17.242 5.395 14.852 4 12 4m-2 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0m2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
                        clipRule="evenodd"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24">
                      <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M19.707 5.707a1 1 0 0 0-1.414-1.414l-4.261 4.26a4 4 0 0 0-5.478 5.478l-4.261 4.262a1 1 0 1 0 1.414 1.414l4.261-4.26a4 4 0 0 0 5.478-5.478zm-7.189 4.36a2 2 0 0 0-2.45 2.45zm-1.036 3.865 2.45-2.45Q14 11.73 14 12a2 2 0 0 1-2.518 1.932m4.283-9.111C14.63 4.32 13.367 4 12 4 9.148 4 6.757 5.395 4.998 6.906c-1.765 1.517-2.99 3.232-3.534 4.064a1.88 1.88 0 0 0 0 2.06 20.3 20.3 0 0 0 2.748 3.344l1.414-1.414A18.3 18.3 0 0 1 3.18 12c.51-.773 1.598-2.268 3.121-3.577C7.874 7.072 9.816 6 12 6a7 7 0 0 1 2.22.367zM12 18a7 7 0 0 1-2.22-.367L8.236 19.18c1.136.5 2.398.821 3.765.821 2.852 0 5.243-1.395 7.002-2.906 1.765-1.517 2.99-3.232 3.534-4.064.411-.628.411-1.431 0-2.06a20.3 20.3 0 0 0-2.748-3.344L18.374 9.04A18.3 18.3 0 0 1 20.82 12c-.51.773-1.598 2.268-3.121 3.577C16.126 16.928 14.184 18 12 18"
                        clipRule="evenodd"></path>
                    </svg>
                  )}
                </button>
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
