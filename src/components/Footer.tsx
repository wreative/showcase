import React from 'react';
import BrandLogo from './BrandLogo';

interface FooterProps {
  brandName: string;
}

const Footer: React.FC<FooterProps> = ({ brandName }) => {
  return (
    <footer className="mt-auto border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <BrandLogo className="h-5 w-7" />
            <span className="text-sm font-medium text-foreground/70">{brandName}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
