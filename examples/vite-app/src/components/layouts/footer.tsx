import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-grid border-t md:px-8 md:py-0">
      <div className="container-wrapper">
        <div className="container py-2 md:py-4">
          <div className="text-balance text-center text-sm leading-7 text-muted-foreground md:text-left">
            Powered by{' '}
            <a href="https://www.lync.world/" target="_blank" rel="noreferrer" className="font-medium">
              LYNC World
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/LYNC-WORLD/metamask-connect-sdk"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            {''}.
          </div>
        </div>
      </div>
    </footer>
  );
};
