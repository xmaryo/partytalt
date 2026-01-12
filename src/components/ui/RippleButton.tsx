import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export default function RippleButton({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  icon,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    ripples.forEach((ripple) => {
      const timeout = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [ripples]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
    onClick?.();
  };

  const baseStyles = `
    relative overflow-hidden inline-flex items-center justify-center gap-2
    px-6 py-3 rounded-xl font-semibold text-sm
    transition-all duration-300 transform
    hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-primary to-blue-600 text-white
      hover:shadow-lg hover:shadow-primary/30
      focus:ring-primary
    `,
    secondary: `
      bg-white dark:bg-slate-800 text-gray-900 dark:text-white
      border border-gray-200 dark:border-slate-700
      hover:bg-gray-50 dark:hover:bg-slate-700
      hover:shadow-lg
      focus:ring-gray-300
    `,
    outline: `
      bg-transparent text-primary border-2 border-primary
      hover:bg-primary hover:text-white
      focus:ring-primary
    `,
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component href={href} onClick={handleClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
            }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
}
