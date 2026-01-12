import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Booking {
  name: string;
  location: string;
  product: string;
  timeAgo: string;
}

const bookings: Booking[] = [
  { name: 'Johan', location: 'Landskrona', product: 'Partytält 6x12m', timeAgo: '2 min sedan' },
  { name: 'Emma', location: 'Helsingborg', product: '50 stolar + 5 bord', timeAgo: '15 min sedan' },
  { name: 'Anders', location: 'Ängelholm', product: 'Flextält 3x3m', timeAgo: '32 min sedan' },
  { name: 'Lisa', location: 'Höganäs', product: 'Partytält 4x8m', timeAgo: '1 timme sedan' },
  { name: 'Marcus', location: 'Bjuv', product: '100 stolar', timeAgo: '2 timmar sedan' },
  { name: 'Sofia', location: 'Helsingborg', product: 'Cocktailbord x10', timeAgo: '3 timmar sedan' },
];

export default function BookingTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show each booking for 4 seconds, then hide for 8 seconds
    const showDuration = 4000;
    const hideDuration = 8000;

    const showTimer = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bookings.length);
        setIsVisible(true);
      }, hideDuration);
    }, showDuration + hideDuration);

    return () => clearInterval(showTimer);
  }, []);

  const current = bookings[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-40 max-w-xs"
        >
          <div
            className="
            flex items-center gap-3
            bg-white dark:bg-slate-800
            rounded-xl shadow-lg
            border border-gray-100 dark:border-slate-700
            p-4
          "
          >
            {/* Pulsing dot */}
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {current.name} i {current.location}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                bokade just <span className="text-primary font-medium">{current.product}</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{current.timeAgo}</p>
            </div>

            {/* Checkmark */}
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
