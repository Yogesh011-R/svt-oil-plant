import React from 'react';

const ExportBtn = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='p-3 border border-black border-opacity-30 text-sm text-black text-opacity-80 bg-purple bg-opacity-20 rounded-md '
    >
      {text}
    </button>
  );
};

export default ExportBtn;
