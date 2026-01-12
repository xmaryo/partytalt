'use client';

/**
 * HamburgerButton - Animated Hamburger/Close Toggle with Framer Motion
 * Smooth SVG path morphing for premium UX
 */

import { motion } from 'framer-motion';

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

// Hamburger paths - 3 horizontal lines
const HAMBURGER_TOP = 'M 3 6 L 21 6';
const HAMBURGER_MIDDLE = 'M 3 12 L 21 12';
const HAMBURGER_BOTTOM = 'M 3 18 L 21 18';

// Close paths - X shape
const CLOSE_TOP = 'M 5 5 L 19 19';
const CLOSE_MIDDLE = 'M 12 12 L 12 12';
const CLOSE_BOTTOM = 'M 19 5 L 5 19';

const ANIMATION_DURATION = 0.35;
const ANIMATION_EASING: [number, number, number, number] = [0.4, 0.0, 0.2, 1];

export default function HamburgerButton({ isOpen, onToggle, size = 24, className = '' }: HamburgerButtonProps) {
  const pathVariants = {
    transition: {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASING,
    },
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        group relative flex items-center justify-center
        cursor-pointer touch-manipulation
        text-gray-900 dark:text-white
        hover:text-gray-900 dark:hover:text-white
        transition-all duration-200
        hover:bg-black/[0.08] active:bg-black/[0.12]
        dark:hover:bg-white/[0.08] dark:active:bg-white/[0.12]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
        rounded-full p-2
        ${className}
      `}
      style={{
        width: size + 16,
        height: size + 16,
      }}
      aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
      aria-expanded={isOpen}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible transition-transform duration-200 group-hover:scale-110"
      >
        <motion.path
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ d: isOpen ? CLOSE_TOP : HAMBURGER_TOP }}
          transition={pathVariants.transition}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{
            d: isOpen ? CLOSE_MIDDLE : HAMBURGER_MIDDLE,
            opacity: isOpen ? 0 : 1,
          }}
          transition={pathVariants.transition}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ d: isOpen ? CLOSE_BOTTOM : HAMBURGER_BOTTOM }}
          transition={pathVariants.transition}
        />
      </svg>
    </button>
  );
}
