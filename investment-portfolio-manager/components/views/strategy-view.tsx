"use client";

import { Target, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function StrategyView() {
  const goals = [
    {
      id: 1,
      title: "Annual Contribution Target",
      description: "Invest $8,400 per year ($700/month)",
      current: 4200,
      target: 8400,
      status: "on-track",
    },
    {
      id: 2,
      title: "Max Drawdown Limit",
      description: "Keep portfolio drawdown under 20%",
      current: 12.5,
      target: 20,
      status: "on-track",
    },
    {
      id: 3,
      title: "Dividend Income Goal",
      description: "Generate $3,000 in annual dividends",
      current: 2840,
      target: 3000,
      status: "on-track",
    },
    {
      id: 4,
      title: "Tech Sector Allocation",
      description: "Maintain 40-50% tech allocation",
      current: 45,
      target: 50,
      status: "on-track",
    },
  ];

  const principles = [
    {
      icon: TrendingUp,
      title: "Value-Growth Hybrid",
      description:
        "Focus on companies with strong fundamentals and growth potential. Blend established dividend payers with high-growth opportunities.",
    },
    {
      icon: Target,
      title: "Geographic Diversification",
      description:
        "Maintain exposure to both US markets and Argentine opportunities. Target 70/30 US/Argentina split.",
    },
    {
      icon: AlertCircle,
      title: "Risk Management",
      description:
        "Never exceed 20% drawdown. Use position sizing to limit single-stock risk. Maintain emergency cash buffer.",
    },
    {
      icon: CheckCircle2,
      title: "Dollar-Cost Averaging",
      description:
        "Consistent monthly contributions of $700 split across target allocation percentages.",
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "on-track") {
      return (
        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
          On Track
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
        Needs Attention
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Investment Strategy
        </h2>
        <p className="text-muted-foreground">
          Your allocation goals and investment principles
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <Card key={goal.id} className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-base text-foreground">{goal.title}</CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </div>
                {getStatusBadge(goal.status)}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">
                      {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-2" />
                  <p className="text-right text-xs text-muted-foreground">
                    {progress.toFixed(0)}% complete
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Investment Principles</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <Card
              key={principle.title}
              className="border-border/40 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20">
                  <principle.icon className="h-5 w-5 text-indigo-400" />
                </div>
                <CardTitle className="text-base text-foreground">{principle.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{principle.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
