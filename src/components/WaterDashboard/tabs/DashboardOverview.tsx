import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';

import { waterData } from '../../../data/waterData';
import { 
  calculateEfficiency, 
  generate3DFlowData, 
  generateZonePerformanceData,
  generateLossDistributionData, 
  generateRadarData,
  getPreviousMonthData
} from '../../../utils/waterCalculations';
import { 
  ACCENT_COLOR, 
  SUCCESS_COLOR, 
  DANGER_COLOR, 
  BASE_COLOR,
  generateGradient 
} from '../../../utils/colorScheme';
import AnimatedCard from '../AnimatedCard';
import AnimatedProgressBar from '../AnimatedProgressBar';
import CustomTooltip from '../CustomTooltip';

interface DashboardOverviewProps {
  selectedMonth: string;
  animationsEnabled: boolean;
  timeRange: number;
  timeRangeLabels: string[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  selectedMonth,
  animationsEnabled,
  timeRange,
  timeRangeLabels,
}) => {
  // Get the data for the selected month
  const latestData = waterData.summary.find(item => item.month === selectedMonth);
  const previousMonthData = getPreviousMonthData(selectedMonth);
  
  // If data not found, return a message
  if (!latestData) {
    return <div className="p-4 text-center">No data available for the selected month.</div>;
  }
  
  // Calculate system efficiency
  const efficiency = calculateEfficiency(latestData);
  const prevEfficiency = calculateEfficiency(previousMonthData);
  const efficiencyChange = (parseFloat(efficiency) - parseFloat(prevEfficiency)).toFixed(1);
  
  // Generate data for charts
  const flowData = generate3DFlowData(selectedMonth);
  const zonePerformanceData = generateZonePerformanceData(selectedMonth);
  const lossDistributionData = generateLossDistributionData(selectedMonth);
  const radarData = generateRadarData(selectedMonth);
  
  // Generate historical efficiency data for the trend line chart
  const historicalEfficiencyData = waterData.summary
    .slice(0, timeRange + 1)
    .map(item => ({
      month: item.month,
      efficiency: parseFloat(calculateEfficiency(item)),
    }));
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  // SVG icons for the cards
  const supplyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 01.878.645 49.17 49.17 0 01.376 5.452.657.657 0 01-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 00-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 01-.595 4.845.75.75 0 01-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 01-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 01-.658.643 49.118 49.118 0 01-4.708-.36.75.75 0 01-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 005.337 15c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.036 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.369 0 .713.128 1.003.349.283.215.604.401.959.401a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82.75.75 0 01.83-.832c1.343.155 2.703.254 4.077.294a.64.64 0 00.657-.642z" />
    </svg>
  );
  
  const distributionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
      <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
  );
  
  const consumptionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
  
  const lossIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
    </svg>
  );
  
  const efficiencyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
  
  const MotionWrapper = animationsEnabled ? motion.div : React.Fragment;
  const wrapperProps = animationsEnabled
    ? {
        variants: containerAnimation,
        initial: "hidden",
        animate: "visible",
      }
    : {};
  const itemProps = animationsEnabled ? { variants: itemAnimation } : {};
  
  return (
    <MotionWrapper {...wrapperProps}>
      {/* KPI Cards */}
      <MotionWrapper {...itemProps} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <AnimatedCard
          title="Total Water Supply (L1)"
          value={latestData.L1}
          unit="m³"
          change={(latestData.L1 / previousMonthData.L1 - 1) * 100}
          changeLabel="vs previous month"
          gradient={generateGradient(BASE_COLOR, ACCENT_COLOR)}
          icon={supplyIcon}
        />
        
        <AnimatedCard
          title="Water Distribution (L2)"
          value={latestData.L2}
          unit="m³"
          change={(latestData.L2 / previousMonthData.L2 - 1) * 100}
          changeLabel="vs previous month"
          gradient={generateGradient(BASE_COLOR, ACCENT_COLOR)}
          icon={distributionIcon}
        />
        
        <AnimatedCard
          title="Water Consumption (L3)"
          value={latestData.L3}
          unit="m³"
          change={(latestData.L3 / previousMonthData.L3 - 1) * 100}
          changeLabel="vs previous month"
          gradient={generateGradient(BASE_COLOR, ACCENT_COLOR)}
          icon={consumptionIcon}
        />
        
        <AnimatedCard
          title="Total Water Loss"
          value={latestData.TotalLoss}
          unit="m³"
          change={(latestData.TotalLoss / previousMonthData.TotalLoss - 1) * 100}
          changeLabel="vs previous month"
          gradient={generateGradient(BASE_COLOR, DANGER_COLOR)}
          icon={lossIcon}
        />
        
        <AnimatedCard
          title="System Efficiency"
          value={parseFloat(efficiency)}
          unit="%"
          change={efficiencyChange}
          changeLabel="vs previous month"
          gradient={generateGradient(BASE_COLOR, SUCCESS_COLOR)}
          icon={efficiencyIcon}
        />
      </MotionWrapper>
      
      {/* Water Flow and Efficiency Section */}
      <MotionWrapper {...itemProps} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Water Flow Distribution Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Water Flow Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={flowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Volume (m³)" fill={ACCENT_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* System Efficiency Trend Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Efficiency Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalEfficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="efficiency" stroke={ACCENT_COLOR} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </MotionWrapper>
      
      {/* Zone Performance and Loss Distribution Section */}
      <MotionWrapper {...itemProps} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Zone Performance Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Zone Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Efficiency %" dataKey="efficiency" stroke={SUCCESS_COLOR} fill={SUCCESS_COLOR} fillOpacity={0.6} />
              <Radar name="Loss %" dataKey="loss" stroke={DANGER_COLOR} fill={DANGER_COLOR} fillOpacity={0.6} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Loss Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loss Distribution</h3>
          <div className="space-y-4">
            <AnimatedProgressBar
              label="Stage 01 Loss"
              value={latestData.Stage01Loss}
              max={latestData.L1}
              color={DANGER_COLOR}
            />
            <AnimatedProgressBar
              label="Stage 02 Loss"
              value={latestData.Stage02Loss}
              max={latestData.L2}
              color={DANGER_COLOR}
            />
            <AnimatedProgressBar
              label="Total Loss"
              value={latestData.TotalLoss}
              max={latestData.L1}
              color={DANGER_COLOR}
            />
          </div>
        </div>
      </MotionWrapper>
      
      {/* System Performance Summary */}
      <MotionWrapper {...itemProps} className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">System Efficiency</h4>
            <p className="text-gray-600">
              Overall system efficiency for {selectedMonth} is <span className="font-semibold">{efficiency}%</span>, 
              which is <span className={parseInt(efficiencyChange) >= 0 ? "text-green-600" : "text-red-600"}>
                {parseInt(efficiencyChange) >= 0 ? "up" : "down"} {Math.abs(parseFloat(efficiencyChange))}%
              </span> compared to the previous month.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Water Loss</h4>
            <p className="text-gray-600">
              Total water loss is <span className="font-semibold">{latestData.TotalLoss.toLocaleString()} m³</span>, 
              which represents <span className="font-semibold">
                {((latestData.TotalLoss / latestData.L1) * 100).toFixed(1)}%
              </span> of the total water supply.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Zone Performance</h4>
            <p className="text-gray-600">
              Best performing zone is <span className="font-semibold">
                {zonePerformanceData.sort((a, b) => parseFloat(b.efficiency) - parseFloat(a.efficiency))[0].name}
              </span> with an efficiency of <span className="font-semibold">
                {zonePerformanceData.sort((a, b) => parseFloat(b.efficiency) - parseFloat(a.efficiency))[0].efficiency}%
              </span>.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
            <p className="text-gray-600">
              Focus on reducing losses in <span className="font-semibold">
                {zonePerformanceData.sort((a, b) => b.loss - a.loss)[0].name}
              </span> which has the highest loss at <span className="font-semibold">
                {zonePerformanceData.sort((a, b) => b.loss - a.loss)[0].loss.toLocaleString()} m³
              </span>.
            </p>
          </div>
        </div>
      </MotionWrapper>
    </MotionWrapper>
  );
};

export default DashboardOverview;