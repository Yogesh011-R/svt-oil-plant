import React from 'react';

const TotalDetails = ({ totalInfo }) => {
  return (
    <section className='bg-white my-8 rounded-[10px]'>
      {' '}
      <div className='p-6  border-b'>
        <h1 className='text-xl font-medium'>Total details</h1>
      </div>
      <div className='p-6 py-8'>
        <div className=' border-[0.5px] w-fit border-black border-opacity-30'>
          {totalInfo.map(item => {
            const { name, id, value } = item;

            return (
              <div
                key={id}
                className='grid grid-cols-[1fr_150px]  border-b  divide-x-2'
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
