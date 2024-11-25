'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { IUserResponse, TUser } from '@/types/users';
import Utils from '@/utils/utils';
import Link from 'next/link';
import { useSession } from '@/app/context/SessionProvider';

function Users() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [selecteduser, setSelectedUser] = useState<TUser>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSession();

  async function fetchUsers() {
    const usersData: IUserResponse = await Utils.callRestAPI({
      url: '/api/users'
    });

    setUsers(usersData.data);
  }

  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  const deleteUser = useCallback(async () => {
    setIsLoading(true);
    await Utils.callRestAPI({
      url: `/api/users/${selecteduser?.id}`,
      method: 'DELETE'
    });
    setIsLoading(false);
    setIsDeleteModalOpen(false);
    fetchUsers();
  }, [selecteduser]);

  return (
    <>
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete confirmation
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {`Are you sure you want to delete the user ${selecteduser?.username}?`}
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none">
                  Cancel
                </button>
                <button
                  onClick={deleteUser}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none disabled:bg-gray-400"
                  disabled={isLoading}>
                  {isLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <strong>Users</strong>
        {currentUser?.write && (
          <button className="bg-blue-500 rounded p-1 px-3 text-white cursor-pointer hover:bg-blue-600">
            <Link href="/users/add">Add user</Link>
          </button>
        )}
      </div>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 whitespace-nowrap">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {users.map((e) => (
              <tr key={e.id}>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {e.username}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {e.role.name}
                </td>
                <td className="px-4 py-4 text-sm text-gray-800">
                  {currentUser?.update && (
                    <button className="text-blue-600 mr-4">
                      <Link href={`/users/edit/${e.id}`}>Edit</Link>
                    </button>
                  )}
                  {currentUser?.delete && (
                    <button
                      className="text-red-600"
                      onClick={() => {
                        setSelectedUser(e);
                        setIsDeleteModalOpen(true);
                      }}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
