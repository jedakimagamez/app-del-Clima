import React from 'react';
import { PuffLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <div className="loader-container">
      <PuffLoader color="#007bff" loading={loading} size={60} />
    </div>
  );
};

export default Loader;
