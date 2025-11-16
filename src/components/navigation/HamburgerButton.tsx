import { memo } from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const lineBase = 'block h-0.5 w-8 origin-center rounded-full bg-sky-100 transition-transform duration-300 ease-in-out';

export const HamburgerButton = memo(function HamburgerButton({ isOpen, onToggle }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className="relative z-50 flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/30 bg-slate-900/80 text-slate-100 shadow-lg transition hover:border-sky-300/60 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 lg:hidden"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
      onClick={onToggle}
    >
      <span className={`${lineBase} ${isOpen ? 'translate-y-1.5 rotate-45' : '-translate-y-2'}`} />
      <span className={`${lineBase} ${isOpen ? 'scale-x-0 opacity-0' : 'opacity-100'}`} />
      <span className={`${lineBase} ${isOpen ? '-translate-y-1.5 -rotate-45' : 'translate-y-2'}`} />
    </button>
  );
});

