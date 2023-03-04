import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi';

const sidebarOptions = [
  {
    id: 1,
    Icon: (
      <svg
        width='25'
        height='25'
        viewBox='0 0 25 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.6592 9.0973V4.5573C22.6592 3.1473 22.0192 2.5773 20.4292 2.5773H16.3892C14.7992 2.5773 14.1592 3.1473 14.1592 4.5573V9.0873C14.1592 10.5073 14.7992 11.0673 16.3892 11.0673H20.4292C22.0192 11.0773 22.6592 10.5073 22.6592 9.0973Z'
          fill='white'
        />
        <path
          d='M22.6592 20.3473V16.3073C22.6592 14.7173 22.0192 14.0773 20.4292 14.0773H16.3892C14.7992 14.0773 14.1592 14.7173 14.1592 16.3073V20.3473C14.1592 21.9373 14.7992 22.5773 16.3892 22.5773H20.4292C22.0192 22.5773 22.6592 21.9373 22.6592 20.3473Z'
          fill='white'
        />
        <path
          d='M11.1592 9.0973V4.5573C11.1592 3.1473 10.5192 2.5773 8.92918 2.5773H4.88918C3.29918 2.5773 2.65918 3.1473 2.65918 4.5573V9.0873C2.65918 10.5073 3.29918 11.0673 4.88918 11.0673H8.92918C10.5192 11.0773 11.1592 10.5073 11.1592 9.0973Z'
          fill='white'
        />
        <path
          d='M11.1592 20.3473V16.3073C11.1592 14.7173 10.5192 14.0773 8.92918 14.0773H4.88918C3.29918 14.0773 2.65918 14.7173 2.65918 16.3073V20.3473C2.65918 21.9373 3.29918 22.5773 4.88918 22.5773H8.92918C10.5192 22.5773 11.1592 21.9373 11.1592 20.3473Z'
          fill='white'
        />
      </svg>
    ),
    name: 'Dashboard',
    link: '/',
  },
  {
    id: 2,
    Icon: (
      <svg
        width='22'
        height='20'
        viewBox='0 0 22 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M18.6592 18.687V11.687M10.6592 18.687V8.68704M2.65918 18.687L2.65918 14.687M12.0659 3.71455L17.2343 5.65271M9.45795 4.08796L3.85941 8.28687M19.7198 5.12638C20.3056 5.71217 20.3056 6.66192 19.7198 7.2477C19.1341 7.83349 18.1843 7.83349 17.5985 7.2477C17.0127 6.66192 17.0127 5.71217 17.5985 5.12638C18.1843 4.5406 19.1341 4.5406 19.7198 5.12638ZM3.71984 8.12638C4.30563 8.71217 4.30563 9.66192 3.71984 10.2477C3.13405 10.8335 2.18431 10.8335 1.59852 10.2477C1.01273 9.66192 1.01273 8.71217 1.59852 8.12638C2.18431 7.5406 3.13405 7.5406 3.71984 8.12638ZM11.7198 2.12638C12.3056 2.71217 12.3056 3.66192 11.7198 4.2477C11.1341 4.83349 10.1843 4.83349 9.59852 4.2477C9.01273 3.66192 9.01273 2.71217 9.59852 2.12638C10.1843 1.5406 11.1341 1.5406 11.7198 2.12638Z'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    name: 'Purchase soudha',
    subMenu: [
      {
        id: 1,
        name: 'All Purchase Consignment',
        link: '/all-purchase-partner',
      },
      {
        id: 2,
        name: 'Pending Consignment',
        link: '/pending-consignment',
      },
    ],
    links: ['/pending-consignment', '/all-purchase-partner'],
  },
  {
    id: 3,
    Icon: (
      <svg
        width='20'
        height='19'
        viewBox='0 0 20 19'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1.52441 17.3366C3.75527 14.9705 6.78404 13.5163 10.1201 13.5163C13.4562 13.5163 16.485 14.9705 18.7158 17.3366M14.418 5.39816C14.418 7.7718 12.4938 9.69601 10.1201 9.69601C7.74648 9.69601 5.82227 7.7718 5.82227 5.39816C5.82227 3.02452 7.74648 1.10031 10.1201 1.10031C12.4938 1.10031 14.418 3.02452 14.418 5.39816Z'
          stroke='white'
          strokeWidth='1.91016'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    name: 'Account',
    link: '/account',
  },
];

const Sidebar = () => {
  const location = useLocation().pathname;
  console.log(
    '🚀 ~ file: Sidebar.jsx:98 ~ Sidebar ~ location:',
    location.split('/')[1]
  );

  const container = useRef(null);

  const [height, setHeight] = useState('0px');
  const [isOpened, setIsOpened] = useState(false);

  return (
    <aside className='w-[271.73px] bg-primary sticky top-0 h-screen'>
      <div className='py-4 px-8 border-b border-white  border-opacity-40'>
        <Link to='/' className='text-white text-3xl font-[800]'>
          LOGO
        </Link>
      </div>
      <ul>
        {sidebarOptions.map(item => {
          const { Icon, id, link, name, subMenu, links } = item;

          return (
            <React.Fragment key={id}>
              <li
                className={`${
                  link === location ||
                  links?.includes(location) ||
                  links?.includes(`/${location.split('/')[1]}`)
                    ? 'bg-secondary'
                    : ''
                } p-3.5 border-b flex justify-between border-white border-opacity-40`}
              >
                {subMenu ? (
                  <button
                    onClick={() => {
                      setIsOpened(prev => !prev);
                      setHeight(
                        !isOpened
                          ? `${container.current.scrollHeight}px`
                          : '0px'
                      );
                    }}
                    className='flex flex-1 items-center justify-between'
                  >
                    <div className='flex  items-center w-full flex-1 space-x-3.5'>
                      {Icon}{' '}
                      <span className='text-white font-medium'>{name}</span>
                    </div>
                    <div className='justify-self-end'>
                      <HiChevronDown className='text-white text-2xl ' />
                    </div>
                  </button>
                ) : (
                  <Link to={link} className='flex flex-1 items-center '>
                    <div className='flex  items-center space-x-3.5'>
                      {Icon}{' '}
                      <span className='text-white font-medium'>{name}</span>
                    </div>
                  </Link>
                )}
              </li>
              {subMenu && (
                <div
                  ref={container}
                  style={{ height: height }}
                  className='overflow-hidden'
                >
                  {subMenu?.map(item => {
                    const { id, link, name } = item;
                    return (
                      <li
                        key={id}
                        className={`${
                          link === location ||
                          link === `/${location.split('/')[1]}`
                            ? 'bg-secondary'
                            : ''
                        } p-3.5 border-b border-white border-opacity-40`}
                      >
                        <Link
                          to={link}
                          className='flex justify-between text-sm  ml-8 items-center '
                        >
                          <span className='text-white font-medium'>{name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
