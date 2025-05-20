
import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  status?: "success" | "warning" | "danger" | "neutral";
  statusText?: string;
  value?: string | number;
  unit?: string;
  change?: number;
  changeText?: string;
  children?: React.ReactNode;
  className?: string;
}

export const StatsCard = ({
  title,
  subtitle,
  icon,
  status = "neutral",
  statusText,
  value,
  unit,
  change,
  changeText,
  children,
  className,
}: StatsCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-status-success";
      case "warning":
        return "text-status-warning";
      case "danger":
        return "text-status-danger";
      default:
        return "text-gray-600";
    }
  };

  const getChangeColor = () => {
    if (!change) return "text-gray-500";
    return change > 0 ? "text-status-danger" : "text-status-success";
  };

  const showChangeArrow = () => {
    if (change === undefined) return null;
    return change > 0 ? "↑" : "↓";
  };

  return (
    <Card className={cn("stats-card", className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-700">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        {icon && <div className="text-muscat-accent">{icon}</div>}
      </div>

      <div className="mt-4">
        {value !== undefined && (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-800">{value}</span>
            {unit && <span className="ml-1 text-gray-600">{unit}</span>}
          </div>
        )}

        {status !== "neutral" && statusText && (
          <div className={`mt-1 text-sm ${getStatusColor()}`}>
            {statusText}
          </div>
        )}

        {change !== undefined && (
          <div className={`mt-1 text-sm ${getChangeColor()}`}>
            {showChangeArrow()} {Math.abs(change)}% {changeText}
          </div>
        )}
      </div>

      {children}
    </Card>
  );
};

export default StatsCard;
