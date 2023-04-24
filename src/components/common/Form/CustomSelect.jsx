import { useField, useFormikContext } from 'formik';
import React from 'react';
import Select, { components } from 'react-select';
import ErrorBox from './ErrorBox';

const CustomSelect = ({
  label,
  type,
  placeholder,
  options,
  disabled,
  ...props
}) => {
  const [field, meta] = useField({ ...props, type });

  const { values, setFieldValue, setTouched } = useFormikContext();

  return (
    <div className='form-group mb-5'>
      <label className={`${disabled && 'opacity-60'} text-sm block mb-2 text`}>
        {label}
      </label>
      <Select
        {...field}
        {...props}
        isDisabled={disabled}
        options={options}
        onChange={value => {
          setFieldValue(field.name, value.value);
        }}
        value={
          values[field.name] && {
            label:
              values[field.name].charAt(0).toUpperCase() +
              values[field.name].slice(1),
            value: values[field.name],
          }
        }
        placeholder={placeholder}
        components={{ IndicatorSeparator: null }}
        styles={{
          control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            border: '1px solid rgba(0, 0, 0, 0.3)',
            boxShadow: 'none',
            fontSize: '14px',
            borderRadius: '6px',
            padding: '4px 7px',
            color: '#000',
            fontWeight: '500',
            cursor: 'pointer',
            background: '#F0F0EF',
            opacity: isDisabled && '0.7',
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
