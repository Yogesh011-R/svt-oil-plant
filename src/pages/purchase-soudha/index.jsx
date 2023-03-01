import React from 'react';
import BreadCrumb from '../../components/common/BreadCrumb';

const PurchaseSoudha = () => {
  return (
    <div>
      <BreadCrumb
        paths={[{ id: 1, name: 'Home', to: '/' }]}
        currentPage='New Purchase soudha'
      />
    </div>
  );
};

export default PurchaseSoudha;
