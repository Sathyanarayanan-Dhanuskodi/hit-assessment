import React from 'react';

function Employees() {
  return (
    <div>
      <strong>Employees</strong>
      <div className="my-3">
        <p>
          This screen is to showcase the ablity of navigation based on the role.
        </p>
        <p>Only admins can view this link</p>
      </div>
    </div>
  );
}

export default Employees;
