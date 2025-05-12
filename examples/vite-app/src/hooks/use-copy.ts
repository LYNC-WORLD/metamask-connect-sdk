import React, { useState } from 'react';

export const useCopy = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, copyString: string) => {
    event.stopPropagation();
    if (!copyString) return;

    try {
      await navigator.clipboard.writeText(copyString);

      setCopied(true);
      const timeoutId = setTimeout(() => {
        setCopied(false);
        clearTimeout(timeoutId);
      }, 2000);
    } catch (error: unknown) {
      console.error('Error copying text to clipboard: ', error);
    }
  };

  return { copied, copyToClipboard } as const;
};
