'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface ScrollTimelineStep {
  title: string;
  description: string;
  icon?: string;
}

interface ScrollTimelineProps {
  items: ScrollTimelineStep[];
}

function StepItem({
  step,
  index,
  isLast
}: {
  step: ScrollTimelineStep;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <motion.div
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
            isInView
              ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
              : 'border-gray-300 bg-white text-gray-400 dark:border-slate-600 dark:bg-slate-800'
          }`}
          animate={isInView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {isLast ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-lg font-bold">{index + 1}</span>
          )}

          {/* Pulse animation for active step */}
          {isInView && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <div className="relative h-full w-0.5 bg-gray-200 dark:bg-slate-700">
            <motion.div
              className="absolute left-0 top-0 w-full bg-primary origin-top"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              style={{ height: '100%' }}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-1.5">
        <motion.h3
          className={`text-xl font-bold mb-2 transition-colors duration-300 ${
            isInView ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-slate-500'
          }`}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className={`text-base transition-colors duration-300 ${
            isInView ? 'text-gray-600 dark:text-slate-400' : 'text-gray-300 dark:text-slate-600'
          }`}
        >
          {step.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function ScrollTimeline({ items }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative max-w-2xl mx-auto">
      {/* Background progress line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-slate-800 -z-10">
        <motion.div
          className="w-full bg-gradient-to-b from-primary via-primary to-primary/50 origin-top"
          style={{ height: progressHeight }}
        />
      </div>

      {/* Steps */}
      <div className="relative">
        {items.map((step, index) => (
          <StepItem
            key={index}
            step={step}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
