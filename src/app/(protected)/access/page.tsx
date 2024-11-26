'use client';

import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
import { useMasterData } from '@/context/MasterDataProvider';
import Utils from '@/utils/utils';
import { ERoles } from '@/types/types';

function Access() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const masterData = useMasterData();

  function toggleAccordion(id: number) {
    setOpenIndex(openIndex === id ? null : id);
  }

  async function updatePermissions(data: {
    checked: boolean;
    roleId: number;
    moduleId: number;
    permissions: number[];
  }) {
    await Utils.callRestAPI({
      url: '/api/access',
      method: 'PUT',
      data
    });

    toast.success('Permissions updated successfully');
  }

  const checkPermission = useCallback(
    ({
      roleId,
      moduleId,
      permissionId
    }: {
      roleId: number;
      moduleId: number;
      permissionId: number;
    }) => {
      return masterData?.allPermissions?.some(
        (p) =>
          p.roleId === roleId &&
          p.moduleId === moduleId &&
          p.permissions.some((p) => p.id === permissionId)
      );
    },
    [masterData]
  );

  return !masterData?.isLoading ? (
    <div>
      <strong>Access management</strong>

      <div className="w-full max-w-2xl mx-auto space-y-2">
        {masterData?.data?.modules.map((m) => (
          <div key={m.id} className="border rounded-lg">
            <button
              onClick={() => toggleAccordion(m.id)}
              className="flex justify-between items-center w-full p-4 text-left rounded bg-gray-200 hover:bg-gray-300">
              <span className="font-medium">{m.name}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  openIndex === m.id ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`p-4 max-w-none ${
                openIndex === m.id ? 'block' : 'hidden'
              }`}>
              {masterData?.data?.roles.map((r) => {
                return (
                  <div key={r.code} className="grid grid-cols-4">
                    <span>{r.name}</span>
                    <div className="flex items-center gap-x-10">
                      {masterData?.data?.permissions.map((p) => {
                        return (
                          <div key={p.id} className="flex items-center">
                            <input
                              type="checkbox"
                              name={p.name}
                              value={p.id}
                              defaultChecked={checkPermission({
                                roleId: r.id,
                                moduleId: m.id,
                                permissionId: p.id
                              })}
                              disabled={r.id === ERoles.ADMIN}
                              onChange={(e) =>
                                updatePermissions({
                                  checked: e.target.checked,
                                  roleId: r.id,
                                  moduleId: m.id,
                                  permissions: [p.id]
                                })
                              }
                            />
                            <label
                              className="text-gray-800 text-sm ml-2 block"
                              htmlFor={p.name}>
                              {p.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Access;
