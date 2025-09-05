import React, { useState, useEffect } from 'react';

const CountDown = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex justify-center space-x-4 mt-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-black rounded-lg p-4 min-w-[60px] font-bold text-2xl">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-sm mt-2 uppercase text-yellow-400">
            {unit}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountDown;