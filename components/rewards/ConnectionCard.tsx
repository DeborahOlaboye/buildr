"use client";

import React from "react";
import { CheckCircle2, Circle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ConnectionStatus } from "@/types";

interface ConnectionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status: ConnectionStatus;
  optional?: boolean;
  statLabel?: string;
  statValue?: string | number;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export default function ConnectionCard({
  icon,
  title,
  subtitle,
  status,
  optional = false,
  statLabel,
  statValue,
  onConnect,
  onDisconnect,
}: ConnectionCardProps) {
  const isConnected = status === "connected";

  return (
    <div
      className={cn(
        "rounded-xl border p-4 flex flex-col gap-3 transition-colors",
        isConnected
          ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20"
          : "bg-card"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg",
              isConnected
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold">{title}</span>
              {optional && (
                <span className="text-[10px] text-muted-foreground border rounded-full px-1.5 py-0.5">
                  Optional
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <span className="sr-only">{isConnected ? "Connected" : "Not connected"}</span>
        {isConnected ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" aria-hidden="true" />
        )}
      </div>

      {/* Stat */}
      {isConnected && statLabel && statValue !== undefined && (
        <div className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{statValue}</span>{" "}
          {statLabel}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto">
        {isConnected ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs gap-1.5 text-muted-foreground"
            onClick={onDisconnect}
            aria-label={`Disconnect ${title}`}
          >
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            Connected — Disconnect
          </Button>
        ) : (
          <Button size="sm" className="w-full text-xs" onClick={onConnect}>
            Connect {title}
          </Button>
        )}
      </div>
    </div>
  );
}
