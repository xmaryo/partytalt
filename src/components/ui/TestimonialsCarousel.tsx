import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  event?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Anna Lindström',
    location: 'Helsingborg',
    text: 'Fantastisk service! Tältet var perfekt för vårt bröllop. Leverans och montering gick smidigt.',
    rating: 5,
    event: 'Bröllop',
  },
  {
    name: 'Erik Johansson',
    location: 'Landskrona',
    text: 'Professionellt bemötande från första kontakt. Rekommenderar varmt!',
    rating: 5,
    event: 'Företagsevent',
  },
  {
    name: 'Maria Svensson',
    location: 'Ängelholm',
    text: 'Bästa priserna i området och kvaliteten var toppen. Kommer definitivt hyra igen.',
    rating: 5,
    event: '50-årsfest',
  },
  {
    name: 'Johan Pettersson',
    location: 'Höganäs',
    text: 'Smidigt och enkelt att boka. Allt fungerade perfekt på vår studentfest!',
    rating: 5,
    event: 'Studentfest',
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Quote icon */}
      <div className="absolute -top-4 left-8 text-primary/20 text-8xl font-serif">"</div>

      <div className="relative overflow-hidden min-h-[280px] px-8 py-12">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <motion.svg
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-5 h-5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </motion.svg>
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-6 italic">
              "{current.text}"
            </p>

            {/* Author */}
            <div className="flex flex-col items-center">
              <span className="font-bold text-gray-900 dark:text-white">
                {current.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {current.location} • {current.event}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
