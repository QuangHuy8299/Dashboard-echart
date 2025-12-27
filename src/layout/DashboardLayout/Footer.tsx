import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-card h-[65px] flex items-center px-6">
      <div className="flex w-full items-center justify-between">
        <p className="text-sm text-muted-foreground italic hidden sm:block">
          Built with{' '}
          <Heart className="inline-block h-3 w-3 text-destructive fill-current" />
        </p>

        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            Support
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Acme Inc.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
