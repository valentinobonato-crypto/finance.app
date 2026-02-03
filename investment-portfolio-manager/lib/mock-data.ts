import type {
  Asset,
  NewsItem,
  PerformanceDataPoint,
  ContributionAllocation,
  SectorAllocation,
  GeographyAllocation,
  PortfolioKPIs,
} from "./types";

// Mock Portfolio Assets
export const MOCK_ASSETS: Asset[] = [
  {
    id: "1",
    ticker: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    quantity: 15,
    avgPrice: 425.5,
    currentPrice: 478.32,
    sector: "ETF",
    geography: "US",
    riskLevel: 5,
  },
  {
    id: "2",
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    quantity: 25,
    avgPrice: 285.0,
    currentPrice: 495.22,
    sector: "Tech",
    geography: "US",
    riskLevel: 8,
  },
  {
    id: "3",
    ticker: "ALUA.BA",
    name: "Aluar Aluminio Argentino",
    quantity: 500,
    avgPrice: 145.0,
    currentPrice: 168.5,
    sector: "Industrial",
    geography: "Argentina",
    riskLevel: 7,
  },
  {
    id: "4",
    ticker: "BBAR",
    name: "Banco BBVA Argentina",
    quantity: 200,
    avgPrice: 4.85,
    currentPrice: 7.42,
    sector: "Financial",
    geography: "Argentina",
    riskLevel: 9,
  },
  {
    id: "5",
    ticker: "MSFT",
    name: "Microsoft Corporation",
    quantity: 12,
    avgPrice: 285.0,
    currentPrice: 378.91,
    sector: "Tech",
    geography: "US",
    riskLevel: 4,
  },
  {
    id: "6",
    ticker: "BRK.B",
    name: "Berkshire Hathaway Inc.",
    quantity: 8,
    avgPrice: 325.0,
    currentPrice: 362.45,
    sector: "Financial",
    geography: "US",
    riskLevel: 3,
  },
  {
    id: "7",
    ticker: "ASML",
    name: "ASML Holding N.V.",
    quantity: 5,
    avgPrice: 620.0,
    currentPrice: 725.8,
    sector: "Tech",
    geography: "US",
    riskLevel: 6,
  },
  {
    id: "8",
    ticker: "MELI",
    name: "MercadoLibre Inc.",
    quantity: 3,
    avgPrice: 1150.0,
    currentPrice: 1542.3,
    sector: "Consumer",
    geography: "Argentina",
    riskLevel: 7,
  },
];

// Mock News Items
export const MOCK_NEWS: NewsItem[] = [
  {
    id: "n1",
    title: "NVIDIA Announces Next-Gen AI Chips at GTC 2026",
    summary:
      "NVIDIA unveiled its Blackwell Ultra architecture, promising 3x performance gains for AI workloads. Major cloud providers have already placed significant orders.",
    source: "TechCrunch",
    publishedAt: "2026-02-02T08:30:00Z",
    relatedTickers: ["NVDA"],
    sentiment: "Positive",
    category: "Asset Impact",
    sentimentScore: 85,
  },
  {
    id: "n2",
    title: "ASML Reports Record Orders for EUV Lithography Systems",
    summary:
      "ASML reported Q4 orders exceeding expectations, with strong demand from semiconductor manufacturers expanding AI chip production capacity.",
    source: "Reuters",
    publishedAt: "2026-02-01T14:15:00Z",
    relatedTickers: ["ASML", "NVDA"],
    sentiment: "Positive",
    category: "Asset Impact",
    sentimentScore: 72,
  },
  {
    id: "n3",
    title: "SEC Proposes New AI Disclosure Requirements",
    summary:
      "The SEC is considering new rules requiring companies to disclose AI-related risks and investments in their annual filings, potentially affecting tech valuations.",
    source: "Wall Street Journal",
    publishedAt: "2026-02-01T09:00:00Z",
    relatedTickers: ["NVDA", "MSFT", "ASML"],
    sentiment: "Neutral",
    category: "Regulation Watch",
    sentimentScore: -5,
  },
  {
    id: "n4",
    title: "Argentina Central Bank Holds Rates Steady",
    summary:
      "The Argentine Central Bank maintained interest rates at current levels, citing stabilizing inflation expectations. Markets reacted positively to the decision.",
    source: "Bloomberg",
    publishedAt: "2026-01-31T16:45:00Z",
    relatedTickers: ["BBAR", "ALUA.BA", "MELI"],
    sentiment: "Positive",
    category: "Regulation Watch",
    sentimentScore: 45,
  },
  {
    id: "n5",
    title: "Microsoft Cloud Revenue Beats Estimates",
    summary:
      "Microsoft reported Azure revenue growth of 32% YoY, driven by AI services adoption. The company raised full-year guidance for cloud segment.",
    source: "CNBC",
    publishedAt: "2026-01-30T21:00:00Z",
    relatedTickers: ["MSFT"],
    sentiment: "Positive",
    category: "Asset Impact",
    sentimentScore: 78,
  },
  {
    id: "n6",
    title: "Berkshire Hathaway Increases Cash Position",
    summary:
      "Warren Buffett's Berkshire Hathaway reported record cash holdings, signaling cautious market outlook while maintaining core positions.",
    source: "Financial Times",
    publishedAt: "2026-01-30T12:30:00Z",
    relatedTickers: ["BRK.B"],
    sentiment: "Neutral",
    category: "Asset Impact",
    sentimentScore: 10,
  },
  {
    id: "n7",
    title: "MercadoLibre Expands Fintech Services in Brazil",
    summary:
      "MELI announced expansion of its credit and payment services across Brazil, targeting underbanked populations with new digital banking features.",
    source: "TechCrunch",
    publishedAt: "2026-01-29T10:00:00Z",
    relatedTickers: ["MELI"],
    sentiment: "Positive",
    category: "Asset Impact",
    sentimentScore: 65,
  },
  {
    id: "n8",
    title: "Global Aluminum Prices Rise on Supply Concerns",
    summary:
      "Aluminum prices reached 6-month highs amid supply disruptions and increased demand from EV manufacturers. Argentine producers stand to benefit.",
    source: "Reuters",
    publishedAt: "2026-01-28T08:00:00Z",
    relatedTickers: ["ALUA.BA"],
    sentiment: "Positive",
    category: "Market Update",
    sentimentScore: 55,
  },
];

// Generate 12 months of performance data
export const MOCK_PERFORMANCE_DATA: PerformanceDataPoint[] = (() => {
  const data: PerformanceDataPoint[] = [];
  const startDate = new Date("2025-02-01");
  let portfolioValue = 100000;
  let benchmarkValue = 100000;

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    // Simulate daily returns with some volatility
    const portfolioReturn = (Math.random() - 0.48) * 0.02;
    const benchmarkReturn = (Math.random() - 0.48) * 0.015;

    portfolioValue *= 1 + portfolioReturn;
    benchmarkValue *= 1 + benchmarkReturn;

    if (i % 7 === 0) {
      data.push({
        date: date.toISOString().split("T")[0],
        portfolio: Math.round(portfolioValue),
        benchmark: Math.round(benchmarkValue),
      });
    }
  }

  return data;
})();

// Monthly Contribution Allocations
export const MOCK_CONTRIBUTION_ALLOCATIONS: ContributionAllocation[] = [
  {
    id: "c1",
    name: "Debt/Liquidity",
    ticker: "CASH",
    percentage: 30,
    color: "#64748b",
  },
  { id: "c2", name: "Microsoft", ticker: "MSFT", percentage: 25, color: "#10b981" },
  { id: "c3", name: "Berkshire", ticker: "BRK.B", percentage: 20, color: "#6366f1" },
  { id: "c4", name: "ASML", ticker: "ASML", percentage: 15, color: "#8b5cf6" },
  { id: "c5", name: "MercadoLibre", ticker: "MELI", percentage: 10, color: "#f59e0b" },
];

// Sector Allocations (will be computed from assets)
export const MOCK_SECTOR_ALLOCATIONS: SectorAllocation[] = [
  { sector: "Tech", value: 45, color: "#6366f1" },
  { sector: "Financial", value: 20, color: "#10b981" },
  { sector: "Industrial", value: 15, color: "#f59e0b" },
  { sector: "Consumer", value: 10, color: "#ec4899" },
  { sector: "ETF", value: 10, color: "#64748b" },
];

// Geography Allocations (will be computed from assets)
export const MOCK_GEOGRAPHY_ALLOCATIONS: GeographyAllocation[] = [
  { geography: "US", value: 72, color: "#6366f1" },
  { geography: "Argentina", value: 28, color: "#10b981" },
];

// KPI Metrics
export const MOCK_KPIS: PortfolioKPIs = {
  sharpeRatio: 1.42,
  maxDrawdown: 12.5,
  maxDrawdownLimit: 20,
  ytdReturn: 18.7,
  projectedAnnualDividend: 2840,
};
