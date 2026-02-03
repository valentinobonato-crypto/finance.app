"use client";

import { TrendingUp, TrendingDown, BarChart3, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioKPIs } from "@/lib/types";

interface KPICardsProps {
  kpis: PortfolioKPIs | null;
  isLoading: boolean;
}

export function KPICards({ kpis, isLoading }: KPICardsProps) {
  if (isLoading || !kpis) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="mt-2 h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const kpiData = [
    {
      title: "Sharpe Ratio",
      value: kpis.sharpeRatio.toFixed(2),
      description: "Risk-adjusted return",
      icon: BarChart3,
      trend: kpis.sharpeRatio > 1 ? "good" : "neutral",
    },
    {
      title: "Max Drawdown",
      value: `${kpis.maxDrawdown.toFixed(1)}%`,
      description: `Limit: ${kpis.maxDrawdownLimit}%`,
      icon: TrendingDown,
      trend: kpis.maxDrawdown < kpis.maxDrawdownLimit ? "good" : "bad",
      showProgress: true,
      progress: (kpis.maxDrawdown / kpis.maxDrawdownLimit) * 100,
    },
    {
      title: "YTD Return",
      value: `${kpis.ytdReturn > 0 ? "+" : ""}${kpis.ytdReturn.toFixed(1)}%`,
      description: "Year-to-date performance",
      icon: TrendingUp,
      trend: kpis.ytdReturn > 0 ? "good" : "bad",
    },
    {
      title: "Annual Dividend",
      value: formatCurrency(kpis.projectedAnnualDividend),
      description: "Projected for this year",
      icon: DollarSign,
      trend: "neutral",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon
              className={`h-4 w-4 ${
                kpi.trend === "good"
                  ? "text-emerald-500"
                  : kpi.trend === "bad"
                    ? "text-rose-500"
                    : "text-muted-foreground"
              }`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                kpi.trend === "good"
                  ? "text-emerald-500"
                  : kpi.trend === "bad"
                    ? "text-rose-500"
                    : "text-foreground"
              }`}
            >
              {kpi.value}
            </div>
            {kpi.showProgress ? (
              <div className="mt-2">
                <Progress
                  value={kpi.progress}
                  className="h-1.5"
                />
                <p className="mt-1 text-xs text-muted-foreground">{kpi.description}</p>
              </div>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">{kpi.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
