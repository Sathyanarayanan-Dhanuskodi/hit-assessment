'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Utils from '@/utils/utils';
import Roles from '@/components/Roles';
import { TRole } from '@/types/users';
import Loader from '@/components/Loader';
import { EMPLOYEES_URL } from '@/constants/api';
import Input from '@/components/Input';

function EditUser() {
  const router = useRouter();
  const { id } = useParams();

  const [user, setUser] = useState<{
    username: string;
    roles: number[];
  }>({
    username: '',
    roles: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await Utils.callRestAPI({
          url: `${EMPLOYEES_URL}/${id}`
        });

        setUser({
          username: response.data.username,
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

      await Utils.callRestAPI({
        url: `${EMPLOYEES_URL}/${id}`,
        method: 'PUT',
        data: payload
      });

      router.push('/employees');

      toast.success('Employee updated successfully');

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
            <Input
              name="username"
              type="text"
              required
              value={user.username}
              placeholder="Enter username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          <p className="text-gray-800 text-sm mb-2 block">Password</p>
          <div className="relative flex items-center">
            <Input
              name="password"
              type="password"
              placeholder="Enter new password"
              readOnly
              required
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
