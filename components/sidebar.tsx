"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

const NAV_ITEMS = [
  {
    href: '/', label: 'Home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    )
  },
  {
    href: '/my-blogs', label: 'My Blogs', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
    )
  },
  {
    href: '/bookmarks', label: 'Bookmarks', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>
    )
  },
  {
    href: '/profile', label: 'Profile', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" /></svg>
    )
  },
  {
    href: '/home/create-post', label: 'Create Post', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    )
  },
];

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) return null; // prevent mismatch

  const isDarkMode = resolvedTheme === "dark";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={[
          'fixed top-0 left-0 z-50 h-full w-64',
          'bg-white dark:bg-zinc-900',
          'border-r border-zinc-200 dark:border-zinc-800',
          'shadow-xl flex flex-col',
          'transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Navigation
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center h-7 w-7 rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
          >
            <XIcon />
          </button>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
            >
              <span className="text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-150">
                {icon}
              </span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
          >
            <span className="text-zinc-400">
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
            </span>
            <span>{isDarkMode ? 'Dark mode' : 'Light mode'}</span>

            <span className="ml-auto">
              <span
                className={[
                  'inline-flex h-5 w-9 items-center rounded-full',
                  'border border-zinc-300 dark:border-zinc-600',
                  'transition-colors duration-200',
                  isDarkMode ? 'bg-zinc-900' : 'bg-zinc-100',
                ].join(' ')}
              >
                <span
                  className={[
                    'inline-block h-3.5 w-3.5 rounded-full bg-white',
                    'shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700',
                    'transition-transform duration-200',
                    isDarkMode ? 'translate-x-[18px]' : 'translate-x-[2px]',
                  ].join(' ')}
                />
              </span>
            </span>
          </button>
        </div>
      </aside>

      <button
        onClick={() => setIsOpen(true)}
        className={[
          'fixed top-4 left-4 z-30',
          'inline-flex items-center justify-center h-9 w-9 rounded-md',
          'bg-white dark:bg-zinc-900',
          'border border-zinc-200 dark:border-zinc-700',
          'text-zinc-700 dark:text-zinc-300',
          'shadow-sm hover:shadow hover:bg-zinc-50 dark:hover:bg-zinc-800',
          'transition-all duration-150',
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100',
        ].join(' ')}
      >
        <MenuIcon />
      </button>
    </>
  );
};

export default Sidebar;