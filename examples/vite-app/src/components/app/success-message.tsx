import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BsPatchCheckFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useCopy } from '@/hooks';

type SuccessMessageProps = {
  transactionHash: string;
  onClose: () => void;
};

export const SuccessMessage: React.FC<Readonly<SuccessMessageProps>> = ({ transactionHash, onClose }) => {
  const { copied, copyToClipboard } = useCopy();

  useEffect(() => {
    if (copied) toast.success('Transaction hash copied.');
  }, [copied]);

  if (!transactionHash) return null;

  return (
    <div className="text-green-500 text-sm p-4 bg-green-500/10 backdrop-blur-[5px] border rounded-md border-green-500/35">
      <div className="flex items-center justify-between gap-4">
        <span className="uppercase flex items-center gap-1 font-semibold tracking-wide">
          <BsPatchCheckFill size={18} />
          Transfer Successful
        </span>
        <button onClick={onClose}>
          <X size={16} />
        </button>
      </div>
      <hr className="my-2 border-green-500/35" />
      <p>Transaction Hash:</p>
      <button className="break-all mt-1 text-left" onClick={(event) => copyToClipboard(event, transactionHash)}>
        {transactionHash}
      </button>
    </div>
  );
};
