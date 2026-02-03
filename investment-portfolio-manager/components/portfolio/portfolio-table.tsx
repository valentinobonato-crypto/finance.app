"use client";

import { useState } from "react";
import { Pencil, Trash2, ArrowUpDown, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AssetFormDialog } from "./asset-form-dialog";
import type { Asset, AssetWithMetrics } from "@/lib/types";

type SortField = "ticker" | "totalValue" | "unrealizedPL" | "portfolioPercent";
type SortDirection = "asc" | "desc";

interface PortfolioTableProps {
  assets: AssetWithMetrics[];
  isLoading: boolean;
  onAddAsset: (asset: Omit<Asset, "id">) => Promise<Asset>;
  onUpdateAsset: (id: string, updates: Partial<Asset>) => Promise<void>;
  onDeleteAsset: (id: string) => Promise<void>;
}

export function PortfolioTable({
  assets,
  isLoading,
  onAddAsset,
  onUpdateAsset,
  onDeleteAsset,
}: PortfolioTableProps) {
  const [sortField, setSortField] = useState<SortField>("totalValue");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedAssets = [...assets].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    if (sortField === "ticker") {
      return multiplier * a.ticker.localeCompare(b.ticker);
    }
    return multiplier * (a[sortField] - b[sortField]);
  });

  const getSectorBadgeColor = (sector: Asset["sector"]) => {
    const colors: Record<Asset["sector"], string> = {
      Tech: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
      Financial: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      Industrial: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      Consumer: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      ETF: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    };
    return colors[sector];
  };

  if (isLoading) {
    return (
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground">Portfolio Assets</CardTitle>
          <CardDescription>Manage your investment holdings</CardDescription>
        </div>
        <AssetFormDialog mode="add" onSubmit={onAddAsset} />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort("ticker")}
                  >
                    Ticker
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Avg Price</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-3 h-8 gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort("totalValue")}
                  >
                    Total Value
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-3 h-8 gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort("unrealizedPL")}
                  >
                    Unrealized P/L
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-mr-3 h-8 gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => handleSort("portfolioPercent")}
                  >
                    % Portfolio
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Sector</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAssets.map((asset) => {
                const isProfit = asset.unrealizedPL >= 0;
                return (
                  <TableRow key={asset.id} className="border-border/40">
                    <TableCell className="font-medium text-foreground">
                      {asset.ticker}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{asset.name}</TableCell>
                    <TableCell className="text-right text-foreground">
                      {asset.quantity}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(asset.avgPrice)}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {formatCurrency(asset.currentPrice)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground">
                      {formatCurrency(asset.totalValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {isProfit ? (
                          <TrendingUp className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-rose-500" />
                        )}
                        <span
                          className={`font-medium ${
                            isProfit ? "text-emerald-500" : "text-rose-500"
                          }`}
                        >
                          {isProfit ? "+" : ""}
                          {formatCurrency(asset.unrealizedPL)}
                        </span>
                        <span
                          className={`text-xs ${
                            isProfit ? "text-emerald-500" : "text-rose-500"
                          }`}
                        >
                          ({isProfit ? "+" : ""}
                          {asset.unrealizedPLPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {asset.portfolioPercent.toFixed(1)}%
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSectorBadgeColor(asset.sector)}>
                        {asset.sector}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <AssetFormDialog
                          mode="edit"
                          asset={asset}
                          onSubmit={async (updates) => {
                            await onUpdateAsset(asset.id, updates);
                          }}
                          trigger={
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          }
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-rose-500 hover:text-rose-400"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Asset</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to remove {asset.ticker} from your
                                portfolio? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDeleteAsset(asset.id)}
                                className="bg-rose-600 hover:bg-rose-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
