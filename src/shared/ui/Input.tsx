import clsx from 'clsx';
import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({
  className,
  label,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className="">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="fullName"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          onChange={onChange}
          value={value}
          className={clsx(
            'w-full rounded border border-stroke bg-gray py-3  px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary',
            className,
          )}
          type="text"
          name="fullName"
          id="fullName"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
