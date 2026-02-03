"use client";

import {
  LayoutDashboard,
  Briefcase,
  Brain,
  Target,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { name: "Portfolio", icon: Briefcase, href: "#portfolio" },
  { name: "Intelligence", icon: Brain, href: "#intelligence" },
  { name: "Strategy", icon: Target, href: "#strategy" },
  { name: "Settings", icon: Settings, href: "#settings" },
];

interface AppSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function AppSidebar({ activeView, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Portfolio Pro</h1>
            <p className="text-xs text-muted-foreground">Value-Growth Strategy</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.name.toLowerCase())}
                    isActive={activeView === item.name.toLowerCase()}
                    className="cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-medium text-muted-foreground">Logged in as</p>
          <p className="text-sm font-semibold text-foreground">Tech Founder & CFO</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
