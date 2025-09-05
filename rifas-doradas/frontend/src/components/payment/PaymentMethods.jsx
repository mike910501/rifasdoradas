import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PaymentMethods = () => {
  const [particles, setParticles] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'pago_movil',
      name: 'Pago Móvil',
      icon: '💳',
      details: 'Banesco',
      account: 'V-12.345.678',
      phone: '0414-123-4567',
      description: 'Transferencias bancarias seguras',
      color: '#3B82F6'
    },
    {
      id: 'nequi',
      name: 'Nequi',
      icon: '📱',
      details: 'Francisco Pirela',
      account: '301-234-5678',
      phone: 'Disponible 24/7',
      description: 'Pagos móviles instantáneos',
      color: '#8B5CF6'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      icon: '💰',
      details: 'rifasdoradas@gmail.com',
      account: 'Francisco Pirela',
      phone: 'Procesamiento rápido',
      description: 'Transferencias internacionales',
      color: '#10B981'
    }
  ];

  // Generar partículas flotantes
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 12; i++) {
        newParticles.push({
          id: i,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 12}s`,
          size: Math.random() * 4 + 3
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleMethodClick = (method) => {
    setSelectedMethod(method.id);
    navigator.clipboard.writeText(`${method.account || method.details}`);
    toast.success(`${method.name}: Información copiada al portapapeles`, {
      icon: method.icon,
      style: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        color: '#ffffff',
        border: `1px solid ${method.color}40`,
      }
    });
    
    // Resetear selección después de 3 segundos
    setTimeout(() => setSelectedMethod(null), 3000);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    })
  };

  return (
    <section className="payment-methods-section">
      {/* Partículas flotantes */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="payment-particle"
          style={{
            left: particle.left,
            animationDelay: particle.animationDelay,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}

      <div className="container">
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="payment-methods-header"
        >
          <h2 className="payment-methods-title">💰 MÉTODOS DE PAGO</h2>
          <p className="payment-methods-subtitle">Elige tu forma de pago favorita - Rápido, Seguro y Confiable</p>
        </motion.div>

        {/* Grid de métodos de pago */}
        <div className="payment-methods-grid">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 1.02,
                transition: { duration: 0.1 }
              }}
              className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => handleMethodClick(method)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleMethodClick(method);
                }
              }}
            >
              {/* Icono del método */}
              <motion.div 
                className="payment-method-icon"
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 15,
                  transition: { duration: 0.3 }
                }}
              >
                {method.icon}
              </motion.div>

              {/* Nombre del método */}
              <h3 className="payment-method-name">{method.name}</h3>

              {/* Detalles del método */}
              <div className="payment-method-details">
                <div className="payment-detail-item">
                  <strong>{method.details}</strong>
                </div>
                <div className="payment-detail-item payment-phone-number">
                  {method.account}
                </div>
                <div className="payment-detail-item">
                  {method.phone}
                </div>
              </div>

              {/* Badge de disponibilidad */}
              <motion.div 
                className="payment-availability-badge"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <span className="badge-text">Disponible 24/7</span>
              </motion.div>

              {/* Indicador de selección */}
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 text-green-400 text-2xl"
                >
                  ✅
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Instrucciones adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-white/80 font-poppins">
            💡 <strong>Tip:</strong> Haz clic en cualquier método para copiar la información de pago
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentMethods;