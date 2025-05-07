import React from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useThemeProvider } from '@/context/theme';
import { Button } from '../ui/button';

export const Header: React.FC = () => {
  const { theme, setTheme } = useThemeProvider();

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container h-auto lg:h-14 gap-4 flex justify-between items-center py-2 lg:py-0">
          <div className="flex items-center">
            <a href="https://www.lync.world/" target="_blank" rel="noopener noreferrer">
              <img
                src={theme === 'dark' ? '/logo-white.png' : '/logo-black.png'}
                alt="LYNC"
                className="hidden sm:block sm:h-9 lg:h-10 object-contain"
              />
              <img
                src={theme === 'dark' ? '/lync-white.png' : '/lync-black.png'}
                alt="LYNC"
                className="h-9 sm:hidden object-contain"
              />
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-8">
            <nav>
              <a
                href="https://github.com/LYNC-WORLD/metamask-connect-sdk/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm md:text-base gap-1 transition-colors hover:text-foreground text-foreground/80"
              >
                <CgFileDocument size={20} />
                Documentation
              </a>
            </nav>
            <Button
              size="icon"
              className="size-8 lg:size-9 rounded-sm"
              variant="outline"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'dark' ? <FaMoon /> : <FaSun />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
