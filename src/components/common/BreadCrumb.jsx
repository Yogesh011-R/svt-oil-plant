import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ paths, currentPage }) => {
  return (
    <div className='flex items-center uppercase'>
      {paths.map((path, i) => {
        return (
          <div className='text-grey text-sm '>
            <Link to={path.to} key={i}>
              {path.name}
            </Link>
            <span>&nbsp; / &nbsp;</span>
          </div>
        );
      })}
      <h3 className='text-primary text-sm font-medium'>{currentPage}</h3>
    </div>
  );
};

export default BreadCrumb;
