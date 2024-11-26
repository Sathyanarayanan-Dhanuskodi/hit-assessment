'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Utils from '@/utils/utils';
import Roles from '@/components/Roles';
import { TRole } from '@/types/users';
import Loader from '@/components/Loader';

function EditUser() {
  const router = useRouter();
  const { id } = useParams();

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

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await Utils.callRestAPI({
          url: `/api/employees/${id}`
        });

        setUser({
          username: response.data.username,
          password: '', // Don't set password for security
          roles: response.data.roles?.map((e: TRole) => e.id)
        });
      } catch {
        setError('Failed to fetch user details');
      }
    }

    if (id) {
      fetchUser();
    }
  }, [id]);

  async function updateUser() {
    setIsLoading(true);

    try {
      const payload: { [key: string]: unknown } = {
        username: user.username,
        roles: user.roles
      };

      if (user.password) {
        payload['password'] = user.password;
      }

      await Utils.callRestAPI({
        url: `/api/employees/${id}`,
        method: 'PUT',
        data: payload
      });

      router.push('/employees');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('Error updating user', err);
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setIsLoading(false);
    }
  }

  return !isLoading ? (
    <>
      <strong>Edit user</strong>
      <div className="flex justify-center w-full">
        <form className="min-w-[400px] mt-8 space-y-4">
          <p className="text-gray-800 text-sm mb-2 block">Username</p>
          <div className="relative flex items-center">
            <input
              name="username"
              type="text"
              required
              value={user.username}
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <p className="text-gray-800 text-sm mb-2 block">Password</p>
          <div className="relative flex items-center">
            <input
              name="password"
              type="password"
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter new password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <p className="text-gray-800 text-sm mb-2 block">Roles</p>
          <Roles
            selectedRoles={user.roles}
            onChange={(e) =>
              setUser({
                ...user,
                roles: e.target.checked
                  ? [...user.roles, parseInt(e.target.value)]
                  : user.roles.filter(
                      (role) => role !== parseInt(e.target.value)
                    )
              })
            }
          />

          <p className="text-red-500 text-sm">{error}</p>

          <div className="mt-8 flex gap-x-2">
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
              onClick={updateUser}>
              {isLoading ? 'Updating user...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default EditUser;
