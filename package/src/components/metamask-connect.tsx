import React from 'react';
import '../assets/styles.css';

import { useMetaMask } from '@/hooks';
import { collapseAddress } from '@/utils';

export const MetamaskConnect: React.FC = () => {
  const { account, connect } = useMetaMask();

  return (
    <React.Fragment>
      {!account && (
        <button className="LYNCMetaMaskConnectSDK__metamask_connect_btn" onClick={connect}>
          Connect Metamask
        </button>
      )}
      {account && <span className="LYNCMetaMaskConnectSDK__connected_address">{collapseAddress(account)}</span>}
    </React.Fragment>
  );
};
