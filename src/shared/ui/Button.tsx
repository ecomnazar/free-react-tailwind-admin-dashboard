import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
  children: React.ReactNode;
  path: string;
}

export const Button: React.FC<Props> = ({ className, children, path }) => {
  return (
    <Link
      to={path}
      className={clsx(
        'inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10',
        className,
      )}
    >
      {children}
    </Link>
  );
};
