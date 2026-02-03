"use client";

import { useState } from "react";
import { LayoutGrid, Activity, BarChart2, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { WidgetVisibility } from "@/lib/types";

interface WidgetStoreProps {
  visibility: WidgetVisibility;
  onToggle: (widget: keyof WidgetVisibility) => void;
}

export function WidgetStore({ visibility, onToggle }: WidgetStoreProps) {
  const [open, setOpen] = useState(false);

  const widgets = [
    {
      id: "volatility" as const,
      name: "Volatility Chart",
      description: "Track portfolio volatility over time",
      icon: Activity,
    },
    {
      id: "beta" as const,
      name: "Beta Analysis",
      description: "Compare portfolio beta to market",
      icon: BarChart2,
    },
    {
      id: "rsi" as const,
      name: "RSI Indicator",
      description: "Relative Strength Index for holdings",
      icon: LineChart,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <LayoutGrid className="h-4 w-4" />
          Widget Store
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Widget Store</DialogTitle>
          <DialogDescription>
            Toggle visibility of additional dashboard widgets
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className="flex items-center justify-between rounded-lg border border-border/40 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <widget.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <Label htmlFor={widget.id} className="cursor-pointer font-medium">
                    {widget.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{widget.description}</p>
                </div>
              </div>
              <Switch
                id={widget.id}
                checked={visibility[widget.id]}
                onCheckedChange={() => onToggle(widget.id)}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
