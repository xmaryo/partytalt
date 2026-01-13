'use client';

/**
 * MobileMenu - Full-screen slide-in drawer for mobile navigation
 * Uses React Portal + Framer Motion for proper layering
 */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HamburgerButton from './HamburgerButton';

interface NavLink {
  text: string;
  href: string;
  target?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  links: NavLink[];
}

function MobileMenuPortal({ isOpen, onToggle, links }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onToggle]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/60 z-[99998]"
          />

          {/* Side Panel */}
          <motion.div
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-slate-800 z-[99999] shadow-[-8px_0_30px_rgba(0,0,0,0.2)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-end p-4 px-5">
              <button
                onClick={onToggle}
                className="flex items-center justify-center w-11 h-11 rounded-full border-none bg-gray-100 dark:bg-slate-700 cursor-pointer text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-5 overflow-y-auto flex flex-col gap-2">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={link.target ? undefined : onToggle}
                  target={link.target}
                  rel={link.target ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="flex items-center p-4 text-[17px] font-medium text-gray-700 dark:text-gray-300 no-underline rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {link.text}
                </motion.a>
              ))}

              {/* Divider */}
              <div className="my-4 border-t border-gray-200 dark:border-slate-700" />

              {/* CTA Button */}
              <motion.a
                href="/kontakt"
                onClick={onToggle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.05 + 0.2 }}
                className="flex items-center justify-center gap-2.5 py-4 px-6 text-base font-semibold text-white no-underline rounded-xl bg-primary hover:bg-secondary transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Boka nu
              </motion.a>
            </nav>

            {/* Footer */}
            <div className="p-5 text-center text-sm text-gray-400 dark:text-gray-500">
              <span>© 2026 partytältHbg</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function MobileMenu({ isOpen, onToggle, links }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hamburger Button - always rendered in header */}
      <HamburgerButton isOpen={isOpen} onToggle={onToggle} />

      {/* Portal renders menu outside header DOM */}
      {mounted && createPortal(<MobileMenuPortal isOpen={isOpen} onToggle={onToggle} links={links} />, document.body)}
    </>
  );
}
