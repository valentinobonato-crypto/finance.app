"use client";

import { PortfolioTable } from "@/components/portfolio/portfolio-table";
import { usePortfolioAssets } from "@/hooks/use-portfolio";

export function PortfolioView() {
  const {
    assets,
    isLoading,
    addAsset,
    updateAsset,
    deleteAsset,
  } = usePortfolioAssets();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Portfolio Management
        </h2>
        <p className="text-muted-foreground">
          View and manage your investment holdings
        </p>
      </div>

      <PortfolioTable
        assets={assets}
        isLoading={isLoading}
        onAddAsset={addAsset}
        onUpdateAsset={updateAsset}
        onDeleteAsset={deleteAsset}
      />
    </div>
  );
}
