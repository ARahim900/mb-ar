import React from 'react';
import { motion } from 'framer-motion';

interface TimeRangeSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  labels: string[];
}

const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  value,
  onChange,
  min,
  max,
  labels,
}) => {
  return (
    <div className="w-full py-4">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <motion.div
          className="absolute left-0 top-0 h-2 bg-gradient-to-r from-accent-500 to-primary-500 rounded-l-lg"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">{labels[0]}</span>
        <span className="text-xs text-gray-500">{labels[Math.floor(labels.length / 2)]}</span>
        <span className="text-xs text-gray-500">{labels[labels.length - 1]}</span>
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm font-medium text-gray-700">
          Showing data from {labels[min]} to {labels[value]}
        </span>
      </div>
    </div>
  );
};

export default TimeRangeSlider;