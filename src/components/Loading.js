import React from 'react';
import './loading.css';

const Loading = ({ label }) => {
  return (
    <svg viewBox='25 25 50 50' className='loader'>
      <circle r='20' cy='50' cx='50'></circle>
    </svg>
  );
};

export default Loading;
