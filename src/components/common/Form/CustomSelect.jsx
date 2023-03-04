import { useField, useFormikContext } from 'formik';
import React from 'react';
import Select, { components } from 'react-select';
import ErrorBox from './ErrorBox';

const CustomSelect = ({ label, type, placeholder, options, ...props }) => {
  const [field, meta] = useField({ ...props, type });

  const { values, setFieldValue, setTouched } = useFormikContext();

  return (
    <div>
      <label className='block mb-2'>{label}</label>
      <Select
        {...field}
        {...props}
        options={options}
        onChange={value => {
          setFieldValue(field.name, value.value);
        }}
        value={
          values?.status && {
            label:
              values.status.charAt(0).toUpperCase() + values.status.slice(1),
            value: values.status,
          }
        }
        placeholder={placeholder}
        components={{ IndicatorSeparator: null }}
        styles={{
          control: styles => ({
            ...styles,
            borderRadius: 0,
            border: '1px solid rgba(0, 0, 0, 0.3)',
            boxShadow: 'none',
            fontSize: '14px',
            borderRadius: '6px',
            padding: '4px 7px',
            color: '#000',
            fontWeight: '500',
            cursor: 'pointer',
            background: '#F0F0EF',
            '&:hover': {
              border: '1px solid rgba(0, 0, 0, 0.3)',
            },
          }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              fontSize: '15px',
              cursor: 'pointer',
              background: isSelected && '#294f83',
              '&:focus': {
                backgroundColor: 'red',
              },
            };
          },
          placeholder: style => ({
            ...style,
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.5)',
            margin: '0',
          }),
        }}
        onFocus={e => {
          setTouched({
            [field.name]: true,
          });
        }}
      />
      {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
    </div>
  );
};

export default CustomSelect;
