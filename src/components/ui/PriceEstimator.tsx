import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductOption {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
}

const products: ProductOption[] = [
  // Tält
  { id: 'flex-3x3', name: 'Flextält 3x3m', price: 500, unit: 'st', category: 'Tält' },
  { id: 'flex-3x6', name: 'Flextält 3x6m', price: 800, unit: 'st', category: 'Tält' },
  { id: 'party-4x6', name: 'Partytält 4x6m', price: 1500, unit: 'st', category: 'Tält' },
  { id: 'party-4x8', name: 'Partytält 4x8m', price: 2000, unit: 'st', category: 'Tält' },
  { id: 'party-6x12', name: 'Partytält 6x12m', price: 4000, unit: 'st', category: 'Tält' },
  // Möbler
  { id: 'chair-white', name: 'Fällstol vit', price: 25, unit: 'st', category: 'Möbler' },
  { id: 'chair-black', name: 'Fällstol svart', price: 25, unit: 'st', category: 'Möbler' },
  { id: 'table-rect', name: 'Bord 180x76cm', price: 75, unit: 'st', category: 'Möbler' },
  { id: 'table-round', name: 'Runt bord Ø150cm', price: 100, unit: 'st', category: 'Möbler' },
  { id: 'cocktail', name: 'Cocktailbord', price: 100, unit: 'st', category: 'Möbler' },
  { id: 'chair-cover', name: 'Stolsöverdrag', price: 20, unit: 'st', category: 'Möbler' },
];

export default function PriceEstimator() {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const updateQuantity = (productId: string, delta: number) => {
    setSelections((prev) => {
      const current = prev[productId] || 0;
      const newValue = Math.max(0, current + delta);
      if (newValue === 0) {
        const { [productId]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newValue };
    });
  };

  const total = useMemo(() => {
    return Object.entries(selections).reduce((sum, [productId, quantity]) => {
      const product = products.find((p) => p.id === productId);
      return sum + (product?.price || 0) * quantity;
    }, 0);
  }, [selections]);

  const hasSelections = Object.keys(selections).length > 0;

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="
        bg-white dark:bg-slate-800
        rounded-2xl shadow-xl
        border border-gray-100 dark:border-slate-700
        overflow-hidden
      "
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Beräkna pris</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Välj produkter för en prisuppskattning</p>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {isExpanded ? 'Dölj' : 'Visa alla'}
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="p-6 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                {category}
              </h4>
              <div className="space-y-2">
                <AnimatePresence>
                  {products
                    .filter((p) => p.category === category)
                    .slice(0, isExpanded ? undefined : 2)
                    .map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                          <p className="text-sm text-primary font-semibold">
                            {product.price} kr/{product.unit}/dag
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(product.id, -1)}
                            className="w-8 h-8 rounded-lg bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                            {selections[product.id] || 0}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, 1)}
                            className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <AnimatePresence>
          {hasSelections && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 dark:border-slate-700"
            >
              <div className="p-6">
                {/* Selected items summary */}
                <div className="mb-4 space-y-1">
                  {Object.entries(selections).map(([productId, quantity]) => {
                    const product = products.find((p) => p.id === productId);
                    if (!product) return null;
                    return (
                      <div key={productId} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>
                          {quantity}x {product.name}
                        </span>
                        <span>{product.price * quantity} kr</span>
                      </div>
                    );
                  })}
                </div>

                {/* Total price */}
                <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Uppskattat pris</span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.2, color: '#3b82f6' }}
                    animate={{ scale: 1, color: '#111827' }}
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                  >
                    {total.toLocaleString('sv-SE')} kr/dag
                  </motion.span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  * Leverans och montering tillkommer. Exakt pris ges vid offertförfrågan.
                </p>

                {/* CTA */}
                <a
                  href="/kontakt"
                  className="
                    w-full inline-flex items-center justify-center gap-2
                    px-6 py-4 rounded-xl
                    bg-gradient-to-r from-primary to-blue-600
                    text-white font-bold
                    hover:shadow-lg hover:shadow-primary/30
                    transition-all duration-300
                  "
                >
                  Få exakt offert
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
