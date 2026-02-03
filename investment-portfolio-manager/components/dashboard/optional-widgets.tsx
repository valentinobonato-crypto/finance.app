"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { WidgetVisibility } from "@/lib/types";

interface OptionalWidgetsProps {
  visibility: WidgetVisibility;
}

// Mock data for optional widgets
const volatilityData = [
  { date: "Jan", value: 12 },
  { date: "Feb", value: 15 },
  { date: "Mar", value: 18 },
  { date: "Apr", value: 14 },
  { date: "May", value: 22 },
  { date: "Jun", value: 19 },
  { date: "Jul", value: 16 },
  { date: "Aug", value: 21 },
  { date: "Sep", value: 17 },
  { date: "Oct", value: 14 },
  { date: "Nov", value: 13 },
  { date: "Dec", value: 15 },
];

const betaData = [
  { ticker: "NVDA", beta: 1.65 },
  { ticker: "ASML", beta: 1.32 },
  { ticker: "MSFT", beta: 0.92 },
  { ticker: "SPY", beta: 1.0 },
  { ticker: "BRK.B", beta: 0.85 },
  { ticker: "MELI", beta: 1.45 },
];

const rsiData = [
  { ticker: "NVDA", rsi: 68 },
  { ticker: "ASML", rsi: 55 },
  { ticker: "MSFT", rsi: 52 },
  { ticker: "SPY", rsi: 58 },
  { ticker: "BRK.B", rsi: 48 },
  { ticker: "MELI", rsi: 62 },
];

export function OptionalWidgets({ visibility }: OptionalWidgetsProps) {
  const hasVisibleWidgets = visibility.volatility || visibility.beta || visibility.rsi;

  if (!hasVisibleWidgets) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {visibility.volatility && (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Volatility</CardTitle>
            <CardDescription>Monthly portfolio volatility %</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={volatilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`${value}%`, "Volatility"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {visibility.beta && (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Beta Analysis</CardTitle>
            <CardDescription>Asset beta vs market</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={betaData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis type="number" stroke="#71717a" fontSize={10} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="ticker"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  width={45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="beta" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {visibility.rsi && (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">RSI Indicator</CardTitle>
            <CardDescription>Relative Strength Index (14-day)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={rsiData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="ticker"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  width={45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="rsi"
                  fill="#10b981"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
