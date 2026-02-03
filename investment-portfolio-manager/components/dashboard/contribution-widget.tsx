"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { ContributionAllocation } from "@/lib/types";

interface ContributionWidgetProps {
  allocations: ContributionAllocation[];
  monthlyGoal: number;
  currentProgress: number;
  isLoading: boolean;
}

export function ContributionWidget({
  allocations,
  monthlyGoal,
  currentProgress,
  isLoading,
}: ContributionWidgetProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const progressPercent = (currentProgress / monthlyGoal) * 100;

  if (isLoading) {
    return (
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-foreground">Monthly Contribution</CardTitle>
        <CardDescription>
          {formatCurrency(currentProgress)} of {formatCurrency(monthlyGoal)} goal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{progressPercent.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Allocation Split
          </p>
          {allocations.map((allocation) => (
            <div key={allocation.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: allocation.color }}
                />
                <span className="text-sm text-foreground">{allocation.name}</span>
                <span className="text-xs text-muted-foreground">({allocation.ticker})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {allocation.percentage}%
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatCurrency((monthlyGoal * allocation.percentage) / 100)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual allocation bar */}
        <div className="flex h-3 overflow-hidden rounded-full">
          {allocations.map((allocation) => (
            <div
              key={allocation.id}
              className="h-full"
              style={{
                width: `${allocation.percentage}%`,
                backgroundColor: allocation.color,
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
