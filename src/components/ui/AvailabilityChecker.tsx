import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AvailabilityChecker() {
  const [selectedDate, setSelectedDate] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'limited' | null>(null);

  const checkAvailability = (date: string) => {
    setSelectedDate(date);
    setStatus('checking');

    // Simulate API check
    setTimeout(() => {
      // Random availability for demo
      const random = Math.random();
      if (random > 0.3) {
        setStatus('available');
      } else {
        setStatus('limited');
      }
    }, 800);
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2); // Minimum 2 days ahead
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="
        bg-white dark:bg-slate-800
        rounded-2xl shadow-xl
        border border-gray-100 dark:border-slate-700
        p-6
        backdrop-blur-sm
      ">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Kolla tillgänglighet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Välj datum för ditt event
        </p>

        <div className="relative">
          <input
            type="date"
            min={getMinDate()}
            value={selectedDate}
            onChange={(e) => checkAvailability(e.target.value)}
            className="
              w-full px-4 py-3
              bg-gray-50 dark:bg-slate-700
              border border-gray-200 dark:border-slate-600
              rounded-xl
              text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all duration-200
              cursor-pointer
            "
          />

          {/* Calendar icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Status display */}
        <AnimatePresence mode="wait">
          {status && (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              {status === 'checking' && (
                <div className="flex items-center gap-2 text-gray-500">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                  />
                  <span>Kollar tillgänglighet...</span>
                </div>
              )}

              {status === 'available' && (
                <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-300">Tillgängligt!</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Vi har lediga produkter detta datum</p>
                  </div>
                </div>
              )}

              {status === 'limited' && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800 dark:text-amber-300">Begränsad tillgänglighet</p>
                    <p className="text-sm text-amber-600 dark:text-amber-400">Skynda dig att boka!</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        {(status === 'available' || status === 'limited') && (
          <motion.a
            href="/kontakt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              mt-4 w-full inline-flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-primary to-blue-600
              text-white font-semibold
              hover:shadow-lg hover:shadow-primary/30
              transition-all duration-300
            "
          >
            Boka nu för detta datum
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        )}
      </div>
    </div>
  );
}
