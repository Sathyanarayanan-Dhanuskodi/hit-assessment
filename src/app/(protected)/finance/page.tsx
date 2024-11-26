'use client';

import React from 'react';
import { useMasterData } from '@/context/MasterDataProvider';
import { EModules } from '@/types/types';

function Finance() {
  const masterData = useMasterData();

  return (
    <div>
      <strong>Finance management</strong>
      <div className="my-3">
        <p>
          This screen is to showcase the ablity of navigation based on the role.
        </p>
        <p>Only authorized people can view this page</p>
        <div className="mt-5">
          <strong>Below are the allowed actions for you in this page:</strong>
          <ul className="list-disc list-inside">
            {masterData?.data?.currentUserPermissions?.map(
              (e) =>
                e.moduleId === EModules.FINANCE_MANAGEMENT &&
                e.permissions.map((p) => <li key={p.id}>{p.name}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Finance;
