'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export default function AnimatedCounter({ value, label }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Extract number from value (e.g., "132K" -> 132)
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  useEffect(() => {
    return display.on('change', (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold text-white mb-2"
        initial={{ y: 20 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {displayValue}{suffix}
      </motion.div>
      <motion.div
        className="text-white/80 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
