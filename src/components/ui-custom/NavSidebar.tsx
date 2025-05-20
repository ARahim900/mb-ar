
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BarChart3, Droplet, Zap, Factory, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const NavSidebar = () => {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileView, setIsMobileView] = useState(false);

  // Check for mobile view on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const navigationItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: BarChart3,
    },
    {
      title: "Water Analysis",
      path: "/water-analysis",
      icon: Droplet,
    },
    {
      title: "Electricity Analysis",
      path: "/electricity-analysis",
      icon: Zap,
    },
    {
      title: "STP Plant",
      path: "/stp-plant",
      icon: Factory,
    },
    {
      title: "Contractor Tracker",
      path: "/contractor-tracker",
      icon: Users,
    },
  ];

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium flex items-center py-2 px-3 rounded-md w-full" 
      : "hover:bg-sidebar-accent/50 flex items-center py-2 px-3 rounded-md w-full";

  return (
    <Sidebar
      className={cn(
        "h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        isMobileView && collapsed ? "w-0" : ""
      )}
      collapsible
    >
      <div className={cn(
        "flex items-center gap-2 px-4 py-3 border-b border-sidebar-border",
        collapsed ? "justify-center" : "justify-start"
      )}>
        {!collapsed && (
          <span className="font-bold text-xl text-sidebar-foreground">Muscat Bay</span>
        )}
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.path} end className={getNavCls}>
                      <item.icon className={cn(
                        "h-5 w-5",
                        collapsed ? "mx-auto" : "mr-3"
                      )} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavSidebar;

// Helper function from utils
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};
