import { useCallback, useEffect, useState } from 'react';
import { DrawerMenu } from './DrawerMenu';
import { HamburgerButton } from './HamburgerButton';
import { NavLinks } from './NavLinks';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const { body } = document;
    if (!body) return;

    body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-3 text-lg font-semibold text-slate-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
            TMQ
          </span>
          Tranquil Mind Quest
        </a>

        <NavLinks className="hidden lg:flex" orientation="horizontal" />

        <div className="flex items-center gap-4">
          <HamburgerButton isOpen={isMenuOpen} onToggle={toggleMenu} />
        </div>
      </nav>

      <DrawerMenu isOpen={isMenuOpen} onClose={closeMenu}>
        <NavLinks orientation="vertical" onNavigate={closeMenu} className="mt-0" />
      </DrawerMenu>
    </header>
  );
}

