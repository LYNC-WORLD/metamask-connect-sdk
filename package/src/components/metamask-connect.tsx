import React from 'react';
import '../assets/styles.css';

import { useAccount, useConnect, useCopy } from '@/hooks';
import { collapseAddress } from '@/utils';

export const MetamaskConnect: React.FC = () => {
  const { account } = useAccount();
  const { isConnecting, connect } = useConnect();
  const { copied, copyToClipboard } = useCopy();

  return (
    <React.Fragment>
      {!account && (
        <button disabled={isConnecting} className="LYNCMetaMaskConnectSDK__metamask_connect_btn" onClick={connect}>
          Connect Metamask
        </button>
      )}
      {account && (
        <button
          className="LYNCMetaMaskConnectSDK__metamask_connect_btn"
          onClick={(event) => copyToClipboard(event, account)}
        >
          <span>{collapseAddress(account)}</span>
          {!copied && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-files-icon lucide-files"
            >
              <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
              <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
              <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
            </svg>
          )}
          {copied && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check-icon lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </button>
      )}
    </React.Fragment>
  );
};
