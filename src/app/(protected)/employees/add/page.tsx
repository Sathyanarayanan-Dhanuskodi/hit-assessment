'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Roles from '@/components/Roles';
import { toast } from 'react-toastify';
import Utils from '@/utils/utils';
import { EMPLOYEES_URL } from '@/constants/api';
import Input from '@/components/Input';

function AddUser() {
  const router = useRouter();

  const [user, setUser] = useState<{
    username: string;
    password: string;
    roles: number[];
  }>({
    username: '',
    password: '',
    roles: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function addUser() {
    setIsLoading(true);

    try {
      await Utils.callRestAPI({
        url: EMPLOYEES_URL,
        method: 'POST',
        data: {
          username: user.username,
          password: user.password,
          roles: user.roles
        }
      });

      router.push('/employees');

      toast.success('Employee added successfully');

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
          <p className="text-gray-800 text-sm mb-2 block">Username</p>
          <div className="relative flex items-center">
            <Input
              name="username"
              type="text"
              required
              placeholder="Enter username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <p className="text-gray-800 text-sm mb-2 block">Password</p>
          <div className="relative flex items-center">
            <Input
              name="password"
              type="password"
              required
              placeholder="Enter password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <p className="text-gray-800 text-sm mb-2 block">Roles</p>
          <Roles
            onChange={(e) =>
              setUser({
                ...user,
                roles: [...user.roles, parseInt(e.target.value)]
              })
            }
          />

          <p className="text-red-500 text-sm">{error}</p>

          <div className="!mt-8 flex gap-x-2">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg border bg-gray-300 hover:bg-gray-400 focus:outline-none"
              onClick={router.back}>
              Back
            </button>
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
