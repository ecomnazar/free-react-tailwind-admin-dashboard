import React from 'react';
import clsx from 'clsx';

interface ColumnProps {
  className?: string;
  children: React.ReactNode;
  colSpan?: number;
  innerClassName?: string;
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  enableJustifyBetween?: boolean;
}

interface TTableTypes {
  Row: React.FC<RowProps>;
  Column: React.FC<ColumnProps>;
}

interface Props {
  title: string;
  rows: string[];
  children: React.ReactNode;
  colspan?: number;
  enableJustifyBetween?: boolean;
}

export const Table: React.FC<Props> & TTableTypes = ({
  title,
  rows,
  children,
  colspan,
  enableJustifyBetween,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
      </div>

      <div
        className={clsx(
          'border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5',
          {
            'grid grid-cols-8': !enableJustifyBetween,
            '!flex': enableJustifyBetween,
          },
        )}
      >
        {rows.map((row, index) => {
          return (
            <div
              key={index}
              className={clsx('col-span-1 flex items-center', {
                '!col-span-3': index === 0,
                '!col-span-2': index === 1,
                '!col-span-1': colspan === 1,
                '!w-[20%]': rows.length === 5 && enableJustifyBetween,
                '!w-[25%]': rows.length === 4 && enableJustifyBetween,
                // '!col-span-8': colspan === 8,
                // '!col-span-10': colspan === 10,
              })}
            >
              <p className="font-medium">{row}</p>
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export const Row: React.FC<RowProps> = ({
  children,
  enableJustifyBetween,
  ...props
}) => {
  return (
    <div
      {...props}
      className={clsx(
        'cursor-pointer hover:bg-gray-2  border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5',
        {
          'grid grid-cols-6 sm:grid-cols-8': !enableJustifyBetween,
          '!flex': enableJustifyBetween,
        },
      )}
    >
      {children}
    </div>
  );
};

export const Column: React.FC<ColumnProps> = ({
  className,
  children,
  colSpan = 1,
  innerClassName,
}) => {
  return (
    <div
      className={clsx('flex', className, {
        'col-span-1': colSpan === 1,
        'col-span-2': colSpan === 2,
        'col-span-3': colSpan === 3,
      })}
    >
      <div className={clsx('flex flex-col gap-4 ', innerClassName)}>
        {children}
      </div>
    </div>
  );
};

Table.Row = Row;
Table.Column = Column;
