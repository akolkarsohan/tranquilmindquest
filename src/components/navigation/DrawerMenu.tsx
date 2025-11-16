import { PropsWithChildren } from 'react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DrawerMenu({ isOpen, onClose, children }: PropsWithChildren<DrawerMenuProps>) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 transition-opacity duration-300 ease-out lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        id="mobile-navigation"
        className={`fixed inset-y-0 right-0 z-50 flex w-72 max-w-full flex-col justify-between bg-gradient-to-b from-slate-900/95 to-slate-950/95 px-6 pb-12 pt-24 shadow-[0_0_30px_rgba(15,23,42,0.6)] transition-transform duration-300 ease-in-out backdrop-blur-xl lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        <p className="mt-8 text-sm text-slate-400">
          Need support? Email us at{' '}
          <a className="font-semibold text-sky-300" href="mailto:care@tranquilmindquest.com">
            care@tranquilmindquest.com
          </a>
        </p>
      </aside>
    </>
  );
}

