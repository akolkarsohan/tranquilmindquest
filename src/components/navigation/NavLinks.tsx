type NavLink = {
  href: string;
  label: string;
};

const defaultLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

interface NavLinksProps {
  orientation?: 'horizontal' | 'vertical';
  onNavigate?: () => void;
  className?: string;
  links?: NavLink[];
}

export function NavLinks({
  orientation = 'horizontal',
  onNavigate,
  className,
  links = defaultLinks,
}: NavLinksProps) {
  const isVertical = orientation === 'vertical';

  const containerClasses = [
    isVertical
      ? 'flex flex-col gap-4 text-lg font-medium text-slate-100'
      : 'flex items-center gap-8 text-sm font-semibold text-slate-100',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <ul className={containerClasses}>
      {links.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            onClick={onNavigate}
            className={[
              'transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400',
              isVertical
                ? 'block rounded-lg px-4 py-2 hover:bg-slate-800/70 hover:text-sky-200'
                : 'relative py-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-sky-400 after:transition-transform hover:text-sky-200 hover:after:scale-x-100',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

