import React from 'react';
import { ClipLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <ClipLoader />
    </div>
  );
}

export default Loader;
