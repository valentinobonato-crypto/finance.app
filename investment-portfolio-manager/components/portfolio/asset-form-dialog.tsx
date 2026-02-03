"use client";

import React from "react"

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Asset } from "@/lib/types";

interface AssetFormDialogProps {
  mode: "add" | "edit";
  asset?: Asset;
  onSubmit: (asset: Omit<Asset, "id"> | Partial<Asset>) => Promise<void>;
  trigger?: React.ReactNode;
}

export function AssetFormDialog({ mode, asset, onSubmit, trigger }: AssetFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ticker: "",
    name: "",
    quantity: "",
    avgPrice: "",
    currentPrice: "",
    sector: "Tech" as Asset["sector"],
    geography: "US" as Asset["geography"],
    riskLevel: "5",
  });

  useEffect(() => {
    if (asset && mode === "edit") {
      setFormData({
        ticker: asset.ticker,
        name: asset.name,
        quantity: asset.quantity.toString(),
        avgPrice: asset.avgPrice.toString(),
        currentPrice: asset.currentPrice.toString(),
        sector: asset.sector,
        geography: asset.geography,
        riskLevel: asset.riskLevel.toString(),
      });
    }
  }, [asset, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const assetData = {
        ticker: formData.ticker.toUpperCase(),
        name: formData.name,
        quantity: Number.parseFloat(formData.quantity),
        avgPrice: Number.parseFloat(formData.avgPrice),
        currentPrice: Number.parseFloat(formData.currentPrice),
        sector: formData.sector,
        geography: formData.geography,
        riskLevel: Number.parseInt(formData.riskLevel),
      };

      await onSubmit(assetData);
      setOpen(false);

      if (mode === "add") {
        setFormData({
          ticker: "",
          name: "",
          quantity: "",
          avgPrice: "",
          currentPrice: "",
          sector: "Tech",
          geography: "US",
          riskLevel: "5",
        });
      }
    } catch (error) {
      console.error("Failed to submit asset:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
            Add Asset
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Asset" : "Edit Asset"}</DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Add a new asset to your portfolio"
              : "Update the asset details"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticker">Ticker</Label>
                <Input
                  id="ticker"
                  placeholder="e.g., AAPL"
                  value={formData.ticker}
                  onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Apple Inc."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avgPrice">Avg Price ($)</Label>
                <Input
                  id="avgPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.avgPrice}
                  onChange={(e) => setFormData({ ...formData, avgPrice: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentPrice">Current Price ($)</Label>
                <Input
                  id="currentPrice"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.currentPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, currentPrice: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sector">Sector</Label>
                <Select
                  value={formData.sector}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sector: value as Asset["sector"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Consumer">Consumer</SelectItem>
                    <SelectItem value="ETF">ETF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="geography">Geography</Label>
                <Select
                  value={formData.geography}
                  onValueChange={(value) =>
                    setFormData({ ...formData, geography: value as Asset["geography"] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="Argentina">Argentina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Level (1-10)</Label>
                <Input
                  id="riskLevel"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isSubmitting ? "Saving..." : mode === "add" ? "Add Asset" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
