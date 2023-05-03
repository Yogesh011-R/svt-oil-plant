import React from 'react';

const TotalDetails = ({ totalInfo }) => {
  return (
    <section className='bg-white my-4 rounded-[10px]'>
      {' '}
      <div className='px-4'>
        <h1 className='text-xl font-medium'>Total details</h1>
      </div>
      <div className='px-6 pt-3'>
        <div className=' border-[0.5px] w-fit border-black border-opacity-30'>
          {totalInfo.map(item => {
            const { name, id, value } = item;

            return (
              <div
                key={id}
                className='grid grid-cols-[280px_180px] border-[0.5px]   divide-black divide-opacity-30  divide-x-[0.5px]'
              >
                <div className='py-4 px-5'>
                  <h2>{name}</h2>
                </div>
                <div className='py-4 px-5 text-center'>{value}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TotalDetails;
