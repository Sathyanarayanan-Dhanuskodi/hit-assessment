'use client';

import { ROLES } from '@/constants/constants';
import Utils from '@/utils/utils';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function EditUser() {
  const router = useRouter();
  const { id } = useParams();

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

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await Utils.callRestAPI({
          url: `/api/users/${id}`
        });

        setUser({
          username: response.data.username,
          password: '', // Don't set password for security
          role: response.data.roleId
        });
      } catch (err: any) {
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
      await Utils.callRestAPI({
        url: `/api/users/${id}`,
        method: 'PUT',
        data: {
          username: user.username,
          ...(user.password && { password: user.password }), // Only include password if it's changed
          roleId: user.role
        }
      });

      router.push('/users');
    } catch (err: any) {
      console.log('Error updating user', err);
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <strong>Edit user</strong>
      <div className="flex justify-center w-full">
        <form className="min-w-[400px] mt-8 space-y-4">
          <label className="text-gray-800 text-sm mb-2 block">Username</label>
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

          <label className="text-gray-800 text-sm mb-2 block">Password</label>
          <div className="relative flex items-center">
            <input
              name="password"
              type="password"
              className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter new password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <label className="text-gray-800 text-sm mb-2 block">Role</label>
          <div className="relative flex items-center">
            <select
              value={user.role}
              onChange={(e) =>
                setUser({ ...user, role: parseInt(e.target.value) })
              }>
              <option value={ROLES.ADMIN}>Admin</option>
              <option value={ROLES.EDITOR}>Editor</option>
              <option value={ROLES.VIEWER}>Viewer</option>
            </select>
          </div>

          <p className="text-red-500 text-sm">{error}</p>

          <div className="mt-8 flex gap-x-2">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm tracking-wide rounded-lg border hover:bg-gray-200 focus:outline-none"
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
  );
}

export default EditUser;
