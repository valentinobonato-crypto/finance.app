"use client";

import { TrendingUp, TrendingDown, ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioHeaderProps {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  weightedRisk: number;
  isLoading: boolean;
}

export function PortfolioHeader({
  totalValue,
  dailyChange,
  dailyChangePercent,
  weightedRisk,
  isLoading,
}: PortfolioHeaderProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRiskBadge = (risk: number) => {
    if (risk <= 4) {
      return {
        label: "Low Risk",
        variant: "default" as const,
        icon: ShieldCheck,
        className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      };
    }
    if (risk <= 6) {
      return {
        label: "Moderate Risk",
        variant: "default" as const,
        icon: Shield,
        className: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      };
    }
    return {
      label: "High Risk",
      variant: "default" as const,
      icon: ShieldAlert,
      className: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    };
  };

  const riskBadge = getRiskBadge(weightedRisk);
  const isPositive = dailyChange >= 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-8 w-28" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Total Net Worth</p>
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          {formatCurrency(totalValue)}
        </h2>
        <div className="mt-1 flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {formatCurrency(dailyChange)} ({isPositive ? "+" : ""}
            {dailyChangePercent.toFixed(2)}%)
          </span>
          <span className="text-sm text-muted-foreground">today</span>
        </div>
      </div>
      <Badge variant={riskBadge.variant} className={`gap-1.5 px-3 py-1.5 ${riskBadge.className}`}>
        <riskBadge.icon className="h-3.5 w-3.5" />
        {riskBadge.label}
      </Badge>
    </div>
  );
}
