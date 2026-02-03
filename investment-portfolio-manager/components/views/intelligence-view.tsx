"use client";

import { IntelligenceHub } from "@/components/intelligence/intelligence-hub";
import { useNewsFeed, useAIReport } from "@/hooks/use-news";

export function IntelligenceView() {
  const {
    assetImpactNews,
    regulationNews,
    marketUpdates,
    isLoading,
    refetch,
  } = useNewsFeed();

  const { isGenerating, report, generateReport } = useAIReport();

  return (
    <IntelligenceHub
      assetImpactNews={assetImpactNews}
      regulationNews={regulationNews}
      marketUpdates={marketUpdates}
      isLoading={isLoading}
      isGeneratingReport={isGenerating}
      report={report}
      onRefresh={refetch}
      onGenerateReport={generateReport}
    />
  );
}
