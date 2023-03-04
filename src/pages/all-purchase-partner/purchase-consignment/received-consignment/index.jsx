import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BreadCrumb from '../../../../components/common/BreadCrumb';
import TableHeader from '../../../../components/common/TableHeader';

const ReceivedConsignment = () => {
  let { partnerId, consignmentId } = useParams();

  const [cSortBy, cSetSortBy] = useState();
  const [desc, setDesc] = useState(true);

  const [searchValue, setSearchValue] = useState('');
  const [entriesValue, setEntriesValue] = useState(10);
  return (
    <div>
      <BreadCrumb
        paths={[
          { id: 1, name: 'Home', to: '/' },
          { id: 1, name: 'Purchase Partner', to: '/all-purchase-partner' },
          {
            id: 1,
            name: 'Booked Consignment',
            to: `/all-purchase-partner/${partnerId}`,
          },
        ]}
        currentPage='Received consignment'
      />
      <section className='bg-white my-8 rounded-[10px]'>
        <TableHeader
          title='Recieved consignment  details:'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          entriesValue={entriesValue}
          setEntriesValue={setEntriesValue}
          partnerDetails={partnerId}
          whatsApp={true}
          btnText='Add new booking'
        />
      </section>
    </div>
  );
};

export default ReceivedConsignment;
