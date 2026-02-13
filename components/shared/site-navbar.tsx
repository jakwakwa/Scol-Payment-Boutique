"use client";

import { BarChart3, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function SiteNavbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">
                  S
                </span>
              </div>
              <h1 className="text-2xl font-bold text-card-foreground">
                StratCol
              </h1>
            </Link>
            <Badge variant="secondary" className="text-xs">
              Payment Hub
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-9",
                    pathname === "/analytics" &&
                      "bg-accent text-accent-foreground",
                  )}
                >
                  <Link href="/analytics">
                    <BarChart3 className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">View Analytics</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-9",
                    pathname === "/integrations" &&
                      "bg-accent text-accent-foreground",
                  )}
                >
                  <Link href="/integrations">
                    <Settings className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Manage Integrations</TooltipContent>
            </Tooltip>
            <div className="w-px h-5 bg-border mx-2" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9">
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Notifications</TooltipContent>
            </Tooltip>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ml-2">
              <span className="text-primary-foreground text-sm font-medium">
                JD
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
