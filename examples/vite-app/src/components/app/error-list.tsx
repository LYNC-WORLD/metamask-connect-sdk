import React from 'react';
import { MdError } from 'react-icons/md';

type ErrorListProps = {
  addressError: string;
  amountError: string;
};

export const ErrorList: React.FC<Readonly<ErrorListProps>> = ({ addressError, amountError }) => {
  if (!addressError && !amountError) return null;

  return (
    <div className="text-red-500 text-sm p-4 bg-destructive/10 backdrop-blur-[5px] border rounded-md border-destructive">
      <div className="flex items-center justify-between gap-4">
        <span className="uppercase flex items-center gap-1 font-semibold tracking-wide">
          <MdError size={18} />
          Error
        </span>
      </div>
      <hr className="my-2 border-destructive" />
      <ul className="list-disc ml-4">
        {addressError && <li>{addressError}</li>}
        {amountError && <li>{amountError}</li>}
      </ul>
    </div>
  );
};
