"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  Asset,
  AssetWithMetrics,
  PerformanceDataPoint,
  ContributionAllocation,
  SectorAllocation,
  GeographyAllocation,
  PortfolioKPIs,
} from "@/lib/types";
import {
  MOCK_ASSETS,
  MOCK_PERFORMANCE_DATA,
  MOCK_CONTRIBUTION_ALLOCATIONS,
  MOCK_KPIS,
} from "@/lib/mock-data";

// Simulate network delay for realistic async behavior
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Hook for fetching and managing portfolio assets
export function usePortfolioAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch assets (simulates Supabase query)
  const fetchAssets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with Supabase call
      // const { data, error } = await supabase.from('assets').select('*')
      await simulateDelay();
      setAssets(MOCK_ASSETS);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch assets"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add asset (simulates Supabase insert)
  const addAsset = useCallback(async (asset: Omit<Asset, "id">) => {
    try {
      // TODO: Replace with Supabase call
      // const { data, error } = await supabase.from('assets').insert(asset).select()
      await simulateDelay(300);
      const newAsset: Asset = {
        ...asset,
        id: `asset-${Date.now()}`,
      };
      setAssets((prev) => [...prev, newAsset]);
      return newAsset;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to add asset");
    }
  }, []);

  // Update asset (simulates Supabase update)
  const updateAsset = useCallback(async (id: string, updates: Partial<Asset>) => {
    try {
      // TODO: Replace with Supabase call
      // const { data, error } = await supabase.from('assets').update(updates).eq('id', id).select()
      await simulateDelay(300);
      setAssets((prev) =>
        prev.map((asset) => (asset.id === id ? { ...asset, ...updates } : asset))
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update asset");
    }
  }, []);

  // Delete asset (simulates Supabase delete)
  const deleteAsset = useCallback(async (id: string) => {
    try {
      // TODO: Replace with Supabase call
      // const { error } = await supabase.from('assets').delete().eq('id', id)
      await simulateDelay(300);
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete asset");
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Compute metrics for each asset
  const assetsWithMetrics: AssetWithMetrics[] = assets.map((asset) => {
    const totalValue = asset.quantity * asset.currentPrice;
    const costBasis = asset.quantity * asset.avgPrice;
    const unrealizedPL = totalValue - costBasis;
    const unrealizedPLPercent = (unrealizedPL / costBasis) * 100;
    const portfolioTotal = assets.reduce(
      (sum, a) => sum + a.quantity * a.currentPrice,
      0
    );
    const portfolioPercent = (totalValue / portfolioTotal) * 100;

    return {
      ...asset,
      totalValue,
      unrealizedPL,
      unrealizedPLPercent,
      portfolioPercent,
    };
  });

  // Calculate total portfolio value
  const totalValue = assetsWithMetrics.reduce((sum, a) => sum + a.totalValue, 0);

  // Calculate total unrealized P/L
  const totalUnrealizedPL = assetsWithMetrics.reduce(
    (sum, a) => sum + a.unrealizedPL,
    0
  );

  // Calculate daily change (mock: random between -2% and +2%)
  const dailyChangePercent = 1.24; // Mock value
  const dailyChange = totalValue * (dailyChangePercent / 100);

  // Calculate weighted risk level
  const weightedRisk =
    assetsWithMetrics.reduce(
      (sum, a) => sum + a.riskLevel * a.portfolioPercent,
      0
    ) / 100;

  // Calculate sector allocations
  const sectorAllocations: SectorAllocation[] = (() => {
    const sectorMap = new Map<string, number>();
    const colors: Record<string, string> = {
      Tech: "#6366f1",
      Financial: "#10b981",
      Industrial: "#f59e0b",
      Consumer: "#ec4899",
      ETF: "#64748b",
    };

    assetsWithMetrics.forEach((asset) => {
      const current = sectorMap.get(asset.sector) || 0;
      sectorMap.set(asset.sector, current + asset.portfolioPercent);
    });

    return Array.from(sectorMap.entries()).map(([sector, value]) => ({
      sector,
      value: Math.round(value * 10) / 10,
      color: colors[sector] || "#64748b",
    }));
  })();

  // Calculate geography allocations
  const geographyAllocations: GeographyAllocation[] = (() => {
    const geoMap = new Map<string, number>();
    const colors: Record<string, string> = {
      US: "#6366f1",
      Argentina: "#10b981",
    };

    assetsWithMetrics.forEach((asset) => {
      const current = geoMap.get(asset.geography) || 0;
      geoMap.set(asset.geography, current + asset.portfolioPercent);
    });

    return Array.from(geoMap.entries()).map(([geography, value]) => ({
      geography,
      value: Math.round(value * 10) / 10,
      color: colors[geography] || "#64748b",
    }));
  })();

  return {
    assets: assetsWithMetrics,
    isLoading,
    error,
    totalValue,
    totalUnrealizedPL,
    dailyChange,
    dailyChangePercent,
    weightedRisk,
    sectorAllocations,
    geographyAllocations,
    refetch: fetchAssets,
    addAsset,
    updateAsset,
    deleteAsset,
  };
}

// Hook for fetching performance data
export function usePerformanceData() {
  const [data, setData] = useState<PerformanceDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with Supabase call
        // const { data, error } = await supabase.from('performance').select('*').order('date')
        await simulateDelay();
        setData(MOCK_PERFORMANCE_DATA);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch performance data")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}

// Hook for contribution allocations
export function useContributionAllocations() {
  const [allocations, setAllocations] = useState<ContributionAllocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with Supabase call
        await simulateDelay();
        setAllocations(MOCK_CONTRIBUTION_ALLOCATIONS);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const monthlyGoal = 700;
  const currentProgress = 525; // Mock current month progress

  return { allocations, isLoading, monthlyGoal, currentProgress };
}

// Hook for KPIs
export function usePortfolioKPIs() {
  const [kpis, setKPIs] = useState<PortfolioKPIs | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with Supabase call
        await simulateDelay();
        setKPIs(MOCK_KPIS);
      } catch {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { kpis, isLoading };
}
