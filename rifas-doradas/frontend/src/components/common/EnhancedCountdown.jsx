import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EnhancedCountdown = ({ endDate, title = "⏰ Tiempo Restante" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;

      if (distance < 0) {
        setIsActive(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const units = [
    { value: timeLeft.days, label: 'Días', key: 'days' },
    { value: timeLeft.hours, label: 'Horas', key: 'hours' },
    { value: timeLeft.minutes, label: 'Minutos', key: 'minutes' },
    { value: timeLeft.seconds, label: 'Segundos', key: 'seconds' }
  ];

  if (!isActive) {
    return (
      <div className="countdown-container">
        <div className="countdown-title">🎊 ¡Rifa Finalizada!</div>
        <div className="text-center text-yellow-400 font-bold text-lg">
          ¡Gracias por participar!
        </div>
      </div>
    );
  }

  return (
    <div className="countdown-container">
      <div className="countdown-title">{title}</div>
      <div className="countdown-display">
        {units.map((unit, index) => (
          <motion.div
            key={unit.key}
            className="countdown-unit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <motion.span 
              key={unit.value}
              className="countdown-number"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {formatNumber(unit.value)}
            </motion.span>
            <span className="countdown-label">{unit.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedCountdown;