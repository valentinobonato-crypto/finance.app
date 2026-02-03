"use client";

import { useState } from "react";
import { Sparkles, AlertTriangle, RefreshCw, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { NewsCard } from "./news-card";
import type { NewsItem } from "@/lib/types";

interface IntelligenceHubProps {
  assetImpactNews: NewsItem[];
  regulationNews: NewsItem[];
  marketUpdates: NewsItem[];
  isLoading: boolean;
  isGeneratingReport: boolean;
  report: string | null;
  onRefresh: () => void;
  onGenerateReport: () => void;
}

export function IntelligenceHub({
  assetImpactNews,
  regulationNews,
  marketUpdates,
  isLoading,
  isGeneratingReport,
  report,
  onRefresh,
  onGenerateReport,
}: IntelligenceHubProps) {
  const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = () => {
    onGenerateReport();
    setShowReport(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Daily Briefing
          </h2>
          <p className="text-muted-foreground">
            AI-powered market intelligence for your portfolio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AI Report Modal/Card */}
      {showReport && report && (
        <Card className="border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20">
                <FileText className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-foreground">AI Intelligence Report</CardTitle>
                <CardDescription>Generated just now</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowReport(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="prose prose-invert prose-sm max-w-none">
                {report.split("\n").map((line, i) => {
                  if (line.startsWith("##")) {
                    return (
                      <h3 key={i} className="mt-4 text-lg font-semibold text-foreground">
                        {line.replace(/^#+\s*/, "")}
                      </h3>
                    );
                  }
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <p key={i} className="font-semibold text-foreground">
                        {line.replace(/\*\*/g, "")}
                      </p>
                    );
                  }
                  if (line.match(/^\d+\./)) {
                    return (
                      <p key={i} className="ml-4 text-muted-foreground">
                        {line}
                      </p>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <p key={i} className="text-muted-foreground">
                        {line}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="asset-impact" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="asset-impact" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Asset Impact
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {assetImpactNews.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="regulation" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Regulation Watch
            <Badge variant="secondary" className="ml-1 h-5 px-1.5">
              {regulationNews.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="asset-impact">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {assetImpactNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
            {marketUpdates.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regulation">
          <div className="space-y-4">
            {regulationNews.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {regulationNews.map((news) => (
                  <Card
                    key={news.id}
                    className="border-amber-500/30 bg-amber-500/5 backdrop-blur-sm"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <Badge
                          variant="outline"
                          className="bg-amber-500/20 text-amber-400 border-amber-500/30"
                        >
                          Regulatory Alert
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-foreground">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{news.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {news.relatedTickers.map((ticker) => (
                          <Badge
                            key={ticker}
                            variant="secondary"
                            className="bg-amber-500/10 text-amber-400"
                          >
                            {ticker}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border/40 bg-card/50 p-8 text-center">
                <p className="text-muted-foreground">No regulatory alerts at this time</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
