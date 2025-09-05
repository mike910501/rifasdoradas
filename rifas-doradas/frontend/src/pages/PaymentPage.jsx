import React from 'react';
import { motion } from 'framer-motion';

const PaymentPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            PROCESAR PAGO
          </h1>
          
          <div className="casino-card">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                Página en Construcción
              </h2>
              <p className="text-lg text-gray-300">
                El sistema de pagos estará disponible pronto.
                Por ahora puedes explorar la selección de números.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;