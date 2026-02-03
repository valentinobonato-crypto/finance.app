"use client";

import { PortfolioHeader } from "@/components/dashboard/portfolio-header";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { AllocationChart } from "@/components/dashboard/allocation-chart";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { ContributionWidget } from "@/components/dashboard/contribution-widget";
import { WidgetStore } from "@/components/dashboard/widget-store";
import { OptionalWidgets } from "@/components/dashboard/optional-widgets";
import {
  usePortfolioAssets,
  usePerformanceData,
  useContributionAllocations,
  usePortfolioKPIs,
} from "@/hooks/use-portfolio";
import type { WidgetVisibility } from "@/lib/types";

interface DashboardViewProps {
  widgetVisibility: WidgetVisibility;
  onToggleWidget: (widget: keyof WidgetVisibility) => void;
}

export function DashboardView({ widgetVisibility, onToggleWidget }: DashboardViewProps) {
  const {
    totalValue,
    dailyChange,
    dailyChangePercent,
    weightedRisk,
    sectorAllocations,
    geographyAllocations,
    isLoading: isLoadingAssets,
  } = usePortfolioAssets();

  const { data: performanceData, isLoading: isLoadingPerformance } = usePerformanceData();

  const {
    allocations,
    monthlyGoal,
    currentProgress,
    isLoading: isLoadingContributions,
  } = useContributionAllocations();

  const { kpis, isLoading: isLoadingKPIs } = usePortfolioKPIs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PortfolioHeader
          totalValue={totalValue}
          dailyChange={dailyChange}
          dailyChangePercent={dailyChangePercent}
          weightedRisk={weightedRisk}
          isLoading={isLoadingAssets}
        />
        <WidgetStore visibility={widgetVisibility} onToggle={onToggleWidget} />
      </div>

      <KPICards kpis={kpis} isLoading={isLoadingKPIs} />

      {/* Bento Grid Layout */}
      <div className="grid gap-4 lg:grid-cols-3">
        <PerformanceChart data={performanceData} isLoading={isLoadingPerformance} />
        <AllocationChart
          sectorAllocations={sectorAllocations}
          geographyAllocations={geographyAllocations}
          isLoading={isLoadingAssets}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ContributionWidget
          allocations={allocations}
          monthlyGoal={monthlyGoal}
          currentProgress={currentProgress}
          isLoading={isLoadingContributions}
        />
      </div>

      <OptionalWidgets visibility={widgetVisibility} />
    </div>
  );
}
