import { ERoles } from '@/types/types';
import React, { ChangeEvent } from 'react';

function Roles({
  selectedRoles,
  onChange
}: Readonly<{
  selectedRoles?: number[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>) {
  return (
    <div className="relative flex items-center gap-x-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          name="admin"
          value={ERoles.ADMIN}
          checked={selectedRoles?.includes(ERoles.ADMIN)}
          onChange={onChange}
        />
        <label className="text-gray-800 text-sm ml-2 block" htmlFor="admin">
          Admin
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="hrm"
          value={ERoles.HRM}
          onChange={onChange}
          checked={selectedRoles?.includes(ERoles.HRM)}
        />
        <label className="text-gray-800 text-sm ml-2 block" htmlFor="hrm">
          HR Manager
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="hr"
          value={ERoles.HR}
          onChange={onChange}
          checked={selectedRoles?.includes(ERoles.HR)}
        />
        <label className="text-gray-800 text-sm ml-2 block" htmlFor="hr">
          HR
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="fm"
          value={ERoles.FM}
          onChange={onChange}
          checked={selectedRoles?.includes(ERoles.FM)}
        />
        <label className="text-gray-800 text-sm ml-2 block" htmlFor="fm">
          Finance manager
        </label>
      </div>
    </div>
  );
}

export default Roles;
