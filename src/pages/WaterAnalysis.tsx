
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import components
import WaterDashboard from "@/components/WaterDashboard";

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
        <div>
          <h1 className="text-3xl font-bold text-muscat-primary">Water Analysis</h1>
          <p className="text-muted-foreground">Water supply and consumption management</p>
        </div>
      </div>

      {/* Water Dashboard - directly displayed without tabs */}
      <WaterDashboard />
    </div>
  );
};

export default WaterAnalysis;
