// Portfolio Asset Interface
export interface Asset {
  id: string;
  ticker: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  sector: "Tech" | "Financial" | "Industrial" | "Consumer" | "ETF";
  geography: "US" | "Argentina";
  riskLevel: number; // 1-10 scale
}

// Computed Asset Values (derived from Asset)
export interface AssetWithMetrics extends Asset {
  totalValue: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  portfolioPercent: number;
}

// News Item Interface
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  relatedTickers: string[];
  sentiment: "Positive" | "Neutral" | "Negative";
  category: "Asset Impact" | "Regulation Watch" | "Market Update";
  sentimentScore: number; // -100 to 100
}

// Portfolio Performance Data Point
export interface PerformanceDataPoint {
  date: string;
  portfolio: number;
  benchmark: number;
}

// Contribution Allocation
export interface ContributionAllocation {
  id: string;
  name: string;
  ticker: string;
  percentage: number;
  color: string;
}

// Sector Allocation
export interface SectorAllocation {
  sector: string;
  value: number;
  color: string;
}

// Geography Allocation
export interface GeographyAllocation {
  geography: string;
  value: number;
  color: string;
}

// KPI Metrics
export interface PortfolioKPIs {
  sharpeRatio: number;
  maxDrawdown: number;
  maxDrawdownLimit: number;
  ytdReturn: number;
  projectedAnnualDividend: number;
}

// Widget Visibility State
export interface WidgetVisibility {
  volatility: boolean;
  beta: boolean;
  rsi: boolean;
}
