"use client";

import { User, Bell, Shield, Database, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base text-foreground">Profile</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Name</Label>
              <p className="text-foreground">Tech Founder</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Role</Label>
              <p className="text-foreground">CFO</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Email</Label>
              <p className="text-foreground">cfo@startup.com</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base text-foreground">Notifications</CardTitle>
                <CardDescription>Configure alert preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="price-alerts">Price Alerts</Label>
              <Switch id="price-alerts" defaultChecked />
            </div>
            <Separator className="bg-border/40" />
            <div className="flex items-center justify-between">
              <Label htmlFor="news-alerts">News Alerts</Label>
              <Switch id="news-alerts" defaultChecked />
            </div>
            <Separator className="bg-border/40" />
            <div className="flex items-center justify-between">
              <Label htmlFor="report-alerts">Weekly Reports</Label>
              <Switch id="report-alerts" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base text-foreground">Security</CardTitle>
                <CardDescription>Protect your account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="2fa">Two-Factor Authentication</Label>
              <Switch id="2fa" defaultChecked />
            </div>
            <Separator className="bg-border/40" />
            <div className="flex items-center justify-between">
              <Label htmlFor="biometric">Biometric Login</Label>
              <Switch id="biometric" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Database className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base text-foreground">Data</CardTitle>
                <CardDescription>Manage your data settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-sync">Auto-sync Portfolio</Label>
              <Switch id="auto-sync" defaultChecked />
            </div>
            <Separator className="bg-border/40" />
            <div className="flex items-center justify-between">
              <Label htmlFor="analytics">Analytics Tracking</Label>
              <Switch id="analytics" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
