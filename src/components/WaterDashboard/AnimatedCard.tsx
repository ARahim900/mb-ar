import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  title: string;
  value: number;
  unit: string;
  change: number | string;
  changeLabel: string;
  gradient: string;
  icon: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  value,
  unit,
  change,
  changeLabel,
  gradient,
  icon,
}) => {
  const isPositive = typeof change === 'number' ? change > 0 : parseFloat(change as string) > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 overflow-hidden relative"
      style={{ background: gradient }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-white text-2xl font-bold">{value.toLocaleString()}</span>
            <span className="text-white/80 ml-1">{unit}</span>
          </div>
          <div className="mt-2 flex items-center">
            <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(typeof change === 'number' ? change : parseFloat(change as string)).toFixed(1)}%
            </span>
            <span className="text-white/60 text-xs ml-1">{changeLabel}</span>
          </div>
        </div>
        <div className="text-white/20 text-3xl">{icon}</div>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;