import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
  title: string;
  animationsEnabled?: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  colors, 
  title,
  animationsEnabled = true
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-gray-700 font-medium">{item.name}</p>
          <p className="text-gray-600">
            <span className="font-semibold">{item.value.toLocaleString()}</span> m³ 
            <span className="ml-2">({percentage}%)</span>
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  const containerAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  const Component = animationsEnabled ? motion.div : 'div';
  const animationProps = animationsEnabled ? {
    variants: containerAnimation,
    initial: "hidden",
    animate: "visible",
  } : {};
  
  return (
    <Component
      className="bg-white p-4 rounded-lg shadow"
      {...animationProps}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={animationsEnabled ? 1000 : 0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Total: <span className="font-bold">{total.toLocaleString()}</span> m³
          </p>
        </div>
      </div>
    </Component>
  );
};

export default DonutChart;