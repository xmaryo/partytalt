import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingCTAProps {
  text?: string;
  href?: string;
  showAfterScroll?: number;
}

export default function FloatingCTA({ text = 'Boka nu', href = '/kontakt', showAfterScroll = 500 }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  useEffect(() => {
    // Stop pulsing after 5 seconds to reduce distraction
    const timer = setTimeout(() => setIsPulsing(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Pulse ring */}
          {isPulsing && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary"
              animate={{
                scale: [1, 1.5, 1.5],
                opacity: [0.5, 0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          )}

          <motion.a
            href={href}
            className="
              relative flex items-center justify-center gap-2
              p-4 md:px-6 md:py-4 rounded-2xl
              bg-gradient-to-br from-primary via-blue-500 to-blue-600
              text-white font-bold text-sm
              ring-1 ring-white/20
              transition-all duration-300
            "
            style={{
              boxShadow: `
                0 2px 4px -1px rgba(0, 0, 0, 0.2),
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 10px 20px -5px rgba(26, 115, 232, 0.4),
                0 20px 40px -10px rgba(26, 115, 232, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.15)
              `,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `
                0 4px 8px -2px rgba(0, 0, 0, 0.25),
                0 8px 12px -2px rgba(0, 0, 0, 0.15),
                0 16px 32px -8px rgba(26, 115, 232, 0.5),
                0 32px 64px -16px rgba(26, 115, 232, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
              `,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Icon */}
            <motion.svg
              className="w-6 h-6 md:w-5 md:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </motion.svg>
            <span className="hidden md:inline">{text}</span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
