import type { EIP6963AnnounceProviderEvent, EIP6963ProviderDetail } from '@/types';

let providers: Array<EIP6963ProviderDetail> = [];

export const store = {
  value: () => providers,
  subscribe: (callback: () => void) => {
    const onAnnouncement = (event: EIP6963AnnounceProviderEvent) => {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid)) return;
      providers = [...providers, event.detail];
      callback();
    };

    window.addEventListener('eip6963:announceProvider', onAnnouncement);
    window.dispatchEvent(new Event('eip6963:requestProvider'));

    return () => window.removeEventListener('eip6963:announceProvider', onAnnouncement);
  },
};
