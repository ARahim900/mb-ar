import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavSidebar from "@/components/ui-custom/NavSidebar";
import Index from "./pages/Index";
import WaterAnalysis from "./pages/WaterAnalysis";
import ElectricityAnalysis from "./pages/ElectricityAnalysis";
import StpPlant from "./pages/StpPlant";
import ContractorTracker from "./pages/ContractorTracker";
import MaterialControlPanel from "./components/MaterialControlPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full">
            <NavSidebar />
            <div className="flex-1 overflow-auto bg-muscat-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/water-analysis" element={<WaterAnalysis />} />
                <Route path="/electricity-analysis" element={<ElectricityAnalysis />} />
                <Route path="/stp-plant" element={<StpPlant />} />
                <Route path="/contractor-tracker" element={<ContractorTracker />} />
                <Route path="/material-control" element={<MaterialControlPanel />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;