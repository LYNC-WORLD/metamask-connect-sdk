import React from 'react';
import { MdWarning } from 'react-icons/md';

type WarningListProps = {
  warning: string;
};

export const WarningList: React.FC<Readonly<WarningListProps>> = ({ warning }) => {
  if (!warning) return null;

  return (
    <div className="text-yellow-500 text-sm p-4 bg-yellow-500/10 backdrop-blur-[5px] border rounded-md border-yellow-500/35">
      <div className="flex items-center justify-between gap-4">
        <span className="uppercase flex items-center gap-1 font-semibold tracking-wide">
          <MdWarning size={18} />
          Warning
        </span>
      </div>
      <hr className="my-2 border-yellow-500/35" />
      <p>{warning}</p>
    </div>
  );
};
