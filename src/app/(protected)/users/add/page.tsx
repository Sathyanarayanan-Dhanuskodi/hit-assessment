'use client';

import { ROLES } from '@/constants/constants';
import Utils from '@/utils/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function AddUser() {
  const router = useRouter();

  const [user, setUser] = useState<{
    username: string;
    password: string;
    role: number;
  }>({
    username: '',
    password: '',
    role: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function addUser() {
    setIsLoading(true);

    try {
      await Utils.callRestAPI({
        url: '/api/users',
        method: 'POST',
        data: {
          username: user.username,
          password: user.password,
          roleId: user.role
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
    <>
      <strong>Add user</strong>
      <div className="flex justify-center w-full">
        <form className="min-w-[400px] mt-8 space-y-4">
          <label className="text-gray-800 text-sm mb-2 block">Username</label>
          <div className="relative flex items-center">
            <input
              name="username"
              type="text"
              required
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <label className="text-gray-800 text-sm mb-2 block">Password</label>
          <div className="relative flex items-center">
            <input
              name="password"
              type="password"
              required
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <label className="text-gray-800 text-sm mb-2 block">Role</label>
          <div className="relative flex items-center">
            <select
              defaultValue={ROLES.ADMIN}
              onChange={(e) =>
                setUser({ ...user, role: parseInt(e.target.value) })
              }>
              <option value={ROLES.ADMIN} defaultChecked>
                Admin
              </option>
              <option value={ROLES.EDITOR}>Editor</option>
              <option value={ROLES.VIEWER}>Viewer</option>
            </select>
          </div>

          <p className="text-red-500 text-sm">{error}</p>

          <div className="!mt-8">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
              disabled={isLoading}
              onClick={addUser}>
              {isLoading ? 'Adding user...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddUser;
