'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Item {
  title?: string;
  description?: string;
  icon?: ReactNode;
  callToAction?: {
    text: string;
    href: string;
  };
}

interface AnimatedItemGridProps {
  items: Item[];
  columns?: 2 | 3 | 4;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

export default function AnimatedItemGrid({ items, columns = 2 }: AnimatedItemGridProps) {
  const gridCols =
    columns === 4
      ? 'lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'
      : columns === 3
        ? 'lg:grid-cols-3 sm:grid-cols-2'
        : 'sm:grid-cols-2';

  return (
    <div className={`grid mx-auto gap-6 md:gap-8 ${gridCols}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={cardVariants}
          whileHover={{
            y: -8,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex flex-row max-w-md p-6 rounded-2xl
            bg-white dark:bg-slate-800/50
            border border-gray-100 dark:border-slate-700
            shadow-m3-1 hover:shadow-m3-2
            transition-shadow duration-300
          `}
        >
          {item.icon && (
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 mr-4">
                {item.icon}
              </div>
            </div>
          )}
          <div className="mt-0.5 flex-1">
            {item.title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>}
            {item.description && (
              <p
                className={`${item.title ? 'mt-2' : ''} text-muted text-sm leading-relaxed`}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            )}
            {item.callToAction && (
              <div className={`${item.title || item.description ? 'mt-4' : ''}`}>
                <a
                  href={item.callToAction.href}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  {item.callToAction.text} &rarr;
                </a>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
