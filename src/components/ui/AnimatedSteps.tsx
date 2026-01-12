'use client';

import { motion } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface AnimatedStepsProps {
  items: Step[];
}

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: {
      delay: i * 0.2 + 0.3,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  }),
};

export default function AnimatedSteps({ items }: AnimatedStepsProps) {
  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative flex gap-6"
        >
          {/* Timeline */}
          <div className="flex flex-col items-center">
            {/* Icon circle */}
            <motion.div
              custom={index}
              variants={iconVariants}
              className={`
                flex items-center justify-center w-12 h-12 rounded-full z-10
                ${index === items.length - 1 ? 'bg-green-500 text-white' : 'bg-primary text-white'}
                shadow-m3-2
              `}
            >
              <span className="text-lg font-bold">{index === items.length - 1 ? '✓' : index + 1}</span>
            </motion.div>

            {/* Connecting line */}
            {index < items.length - 1 && (
              <motion.div custom={index} variants={lineVariants} className="w-0.5 h-24 bg-primary/30 origin-top" />
            )}
          </div>

          {/* Content */}
          <motion.div custom={index} variants={stepVariants} className="flex-1 pb-12">
            <motion.h3
              className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
              dangerouslySetInnerHTML={{ __html: item.title }}
            />
            <motion.p className="text-muted leading-relaxed">{item.description}</motion.p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
