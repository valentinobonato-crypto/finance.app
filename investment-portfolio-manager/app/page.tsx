"use client";

import { useState } from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardView } from "@/components/views/dashboard-view";
import { PortfolioView } from "@/components/views/portfolio-view";
import { IntelligenceView } from "@/components/views/intelligence-view";
import { StrategyView } from "@/components/views/strategy-view";
import { SettingsView } from "@/components/views/settings-view";
import type { WidgetVisibility } from "@/lib/types";

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");
  const [widgetVisibility, setWidgetVisibility] = useState<WidgetVisibility>({
    volatility: false,
    beta: false,
    rsi: false,
  });

  const handleToggleWidget = (widget: keyof WidgetVisibility) => {
    setWidgetVisibility((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <DashboardView
            widgetVisibility={widgetVisibility}
            onToggleWidget={handleToggleWidget}
          />
        );
      case "portfolio":
        return <PortfolioView />;
      case "intelligence":
        return <IntelligenceView />;
      case "strategy":
        return <StrategyView />;
      case "settings":
        return <SettingsView />;
      default:
        return (
          <DashboardView
            widgetVisibility={widgetVisibility}
            onToggleWidget={handleToggleWidget}
          />
        );
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar activeView={activeView} onNavigate={setActiveView} />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border/40 bg-background/80 px-6 backdrop-blur-md">
          <SidebarTrigger className="-ml-2" />
          <h1 className="text-lg font-semibold capitalize text-foreground">
            {activeView}
          </h1>
        </header>
        <main className="flex-1 p-6">{renderView()}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
