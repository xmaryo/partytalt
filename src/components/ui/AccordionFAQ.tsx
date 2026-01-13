'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  title?: string;
  description?: string;
}

interface AccordionFAQProps {
  items: FAQItem[];
}

export default function AccordionFAQ({ items }: AccordionFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div key={index} initial={false} className="group">
          {/* M3 Card with elevation states */}
          <div
            className={`
              overflow-hidden rounded-2xl transition-all duration-300
              ${
                openIndex === index
                  ? 'bg-primary/5 dark:bg-primary/10 shadow-m3-2'
                  : 'bg-white dark:bg-slate-800/50 shadow-m3-1 hover:shadow-m3-2'
              }
              border border-gray-100 dark:border-slate-700
            `}
          >
            {/* Header - M3 Interactive states */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`
                w-full px-6 py-5 flex items-center justify-between text-left
                transition-all duration-200
                hover:bg-gray-50/50 dark:hover:bg-slate-700/30
                active:bg-gray-100/50 dark:active:bg-slate-700/50
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                rounded-2xl
              `}
            >
              <span
                className={`
                font-semibold text-lg transition-colors duration-200
                ${openIndex === index ? 'text-primary dark:text-primary' : 'text-gray-900 dark:text-gray-100'}
              `}
              >
                {item.title}
              </span>

              {/* M3 Animated icon */}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full
                  transition-colors duration-200
                  ${
                    openIndex === index
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                  }
                `}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            {/* Content with Framer Motion animation */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3, delay: 0.1 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.2 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    exit={{ y: -10 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.description || '' }}
                  ></motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
