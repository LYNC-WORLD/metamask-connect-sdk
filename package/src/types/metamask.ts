import { MetaMaskFunctionErrorCodes } from '@/enums';

declare global {
  interface WindowEventMap {
    'eip6963:announceProvider': CustomEvent;
  }
}

export type EIP6963ProviderInfo = {
  rdns: string;
  uuid: string;
  name: string;
  icon: string;
};

export type EIP6963ProviderDetail = {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
};

export type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo;
    provider: Readonly<EIP1193Provider>;
  };
};

export type EIP1193Provider = {
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void;
  send?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void;
  request: (request: { method: string; params?: Array<unknown> }) => Promise<unknown>;
  on: (event: string, callback: (arg: unknown) => void) => void;
};

export type MetaMaskWalletError = {
  code: number;
  message: string;
};

export type MetaMaskFunctionErrorData<E = unknown> = {
  error?: E;
  code: MetaMaskFunctionErrorCodes;
  message: string;
};

export type MetaMaskFunctionReturn<E = unknown> =
  | {
      success: true;
    }
  | {
      success: false;
      errorData: MetaMaskFunctionErrorData<E>;
    };
