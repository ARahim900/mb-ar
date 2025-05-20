
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface WaterConsumptionSummaryProps {
  currentConsumption: number;
  previousConsumption: number;
  changePercentage: number;
}

const WaterConsumptionSummary: React.FC<WaterConsumptionSummaryProps> = ({
  currentConsumption,
  previousConsumption,
  changePercentage
}) => {
  const isIncreasing = changePercentage > 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Current Consumption</CardTitle>
        <CardDescription>Total water consumption this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold">
            {currentConsumption.toLocaleString()}
          </div>
          <div className="text-muted-foreground">m³</div>
        </div>
        
        <div className="mt-2 flex items-center">
          {isIncreasing ? (
            <>
              <ArrowUpRight className="h-4 w-4 text-status-danger mr-1" />
              <span className="text-status-danger text-sm">
                +{Math.abs(changePercentage).toFixed(1)}% from previous month
              </span>
            </>
          ) : (
            <>
              <ArrowDownRight className="h-4 w-4 text-status-success mr-1" />
              <span className="text-status-success text-sm">
                -{Math.abs(changePercentage).toFixed(1)}% from previous month
              </span>
            </>
          )}
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Previous: {previousConsumption.toLocaleString()} m³
        </div>
      </CardContent>
    </Card>
  );
};

export default WaterConsumptionSummary;
