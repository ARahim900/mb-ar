
import React from "react";
import { Card } from "@/components/ui/card";
import { Droplet, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WaterAnalysis = () => {
  return (
    <div className="container py-6">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <Droplet className="h-8 w-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold text-muscat-primary">Water Analysis</h1>
          <p className="text-muted-foreground">Water supply and consumption management</p>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Water System Overview</h2>
        <p className="text-muted-foreground">
          This section will contain detailed analytics and management tools for the water system. 
          Additional data and controls will be added based on your specific requirements.
        </p>
      </Card>
    </div>
  );
};

export default WaterAnalysis;
