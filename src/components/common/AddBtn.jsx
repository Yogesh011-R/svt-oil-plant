import React from 'react';
import { Link } from 'react-router-dom';

const AddBtn = ({ text, link, state }) => {
  return (
    <Link
      state={state}
      to={link}
      className='bg-secondary rounded-md px-9 text-white font-medium text-sm py-3'
    >
      {text}
    </Link>
  );
};

export default AddBtn;
