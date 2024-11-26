import React from 'react';

function Input({
  type,
  name,
  required = false,
  placeholder,
  value,
  defaultChecked,
  disabled,
  onChange,
  className,
  readOnly
}: Readonly<{
  type: React.HTMLInputTypeAttribute;
  name: string;
  required?: boolean;
  placeholder?: string;
  value?: any;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
}>) {
  return (
    <input
      name={name}
      type={type}
      required={required}
      className={`w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 read-only:bg-gray-200 read-only:outline-none ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      defaultChecked={defaultChecked}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}

export default Input;
