import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { HiCheck, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { classNames } from '../../utils/classNames';

const options = [
  { id: 1, value: '10' },
  { id: 2, value: '20' },
  { id: 3, value: '30' },
  { id: 4, value: '50' },
];
const SelectEntries = ({ setEntriesValue }) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Listbox
      value={selected}
      onChange={e => {
        setSelected(e);
        setEntriesValue(e.value);
      }}
    >
      {({ open }) => (
        <div className='flex items-center space-x-2'>
          <div className='relative mt-1 w-[60px]'>
            <Listbox.Button className='relative w-full cursor-default rounded-md border border-black border-opacity-80 bg-white py-2 pl-2 text-left shadow-sm focus:outline-none  sm:text-sm'>
              <span className='block truncate'>{selected.value}</span>
              <span className='pointer-events-none absolute  top-0.5 right-0 flex items-center pr-2'>
                <HiChevronUp
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
              <span className='pointer-events-none absolute  bottom-0.5 right-0 flex items-center pr-2'>
                <HiChevronDown
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm'>
                {options.map(option => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-primary text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {option.value}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-primary',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <HiCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
          <span>entries</span>
        </div>
      )}
    </Listbox>
  );
};

export default SelectEntries;
