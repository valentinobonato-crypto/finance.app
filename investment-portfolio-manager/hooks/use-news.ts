"use client";

import { useState, useEffect, useCallback } from "react";
import type { NewsItem } from "@/lib/types";
import { MOCK_NEWS } from "@/lib/mock-data";

// Simulate network delay for realistic async behavior
const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Hook for fetching news feed
export function useNewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with Supabase call
      // const { data, error } = await supabase
      //   .from('news')
      //   .select('*')
      //   .order('published_at', { ascending: false })
      await simulateDelay();
      setNews(MOCK_NEWS);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch news"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Filter by category
  const assetImpactNews = news.filter((item) => item.category === "Asset Impact");
  const regulationNews = news.filter((item) => item.category === "Regulation Watch");
  const marketUpdates = news.filter((item) => item.category === "Market Update");

  return {
    news,
    assetImpactNews,
    regulationNews,
    marketUpdates,
    isLoading,
    error,
    refetch: fetchNews,
  };
}

// Hook for generating AI reports (simulated)
export function useAIReport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const generateReport = useCallback(async () => {
    setIsGenerating(true);
    try {
      // TODO: Replace with actual AI API call or Supabase Edge Function
      // const { data, error } = await supabase.functions.invoke('generate-report')
      await simulateDelay(2500); // Simulate longer AI processing time

      const mockReport = `
## Portfolio Intelligence Report
### Generated on ${new Date().toLocaleDateString()}

**Market Overview:**
The overall market sentiment remains bullish with technology stocks leading gains. Your portfolio's Value-Growth strategy continues to outperform the benchmark.

**Key Observations:**
1. **NVDA** - Strong momentum continues with AI infrastructure demand
2. **ASML** - Positive outlook from semiconductor equipment orders
3. **Argentina Exposure** - Macro conditions improving, BBAR showing strength

**Risk Assessment:**
Current portfolio beta: 1.15
Recommended action: Consider rebalancing into defensive positions if volatility increases.

**Dividend Forecast:**
Q1 projected dividends: $710 (on track for annual goal)
      `.trim();

      setReport(mockReport);
    } catch {
      // Handle error
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { isGenerating, report, generateReport };
}
