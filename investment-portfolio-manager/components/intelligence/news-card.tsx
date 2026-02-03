"use client";

import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/lib/types";

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    }
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getSentimentBadge = (sentiment: NewsItem["sentiment"]) => {
    const styles = {
      Positive: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      Neutral: "bg-slate-500/20 text-slate-400 border-slate-500/30",
      Negative: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    };
    return styles[sentiment];
  };

  const getSentimentScoreColor = (score: number) => {
    if (score > 30) return "text-emerald-400";
    if (score < -30) return "text-rose-400";
    return "text-slate-400";
  };

  return (
    <Card className="border-border/40 bg-card/50 backdrop-blur-sm transition-colors hover:bg-card/70">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 font-semibold leading-tight text-foreground">
            {news.title}
          </h3>
          <Badge variant="outline" className={getSentimentBadge(news.sentiment)}>
            {news.sentiment}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-3 text-sm text-muted-foreground">{news.summary}</p>

        <div className="flex flex-wrap items-center gap-2">
          {news.relatedTickers.map((ticker) => (
            <Badge
              key={ticker}
              variant="secondary"
              className="bg-indigo-500/10 text-indigo-400"
            >
              {ticker}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border/40 pt-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(news.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              {news.source}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <span className="text-muted-foreground">Sentiment:</span>
            <span className={`font-medium ${getSentimentScoreColor(news.sentimentScore)}`}>
              {news.sentimentScore > 0 ? "+" : ""}
              {news.sentimentScore}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
