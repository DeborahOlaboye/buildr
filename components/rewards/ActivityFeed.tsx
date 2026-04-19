import React from "react";
import { Activity } from "lucide-react";
import ActivityFeedItemComponent from "@/components/rewards/ActivityFeedItem";
import type { ActivityFeedItem } from "@/types";

interface ActivityFeedProps {
  items: ActivityFeedItem[];
}

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 className="text-lg font-semibold">Live Activity</h2>
        <span className="ml-auto text-xs text-muted-foreground">
          {items.length} recent events
        </span>
      </div>

      {/* Feed list */}
      {items.length === 0 ? (
        <div className="rounded-xl border bg-card px-4 py-8 text-center text-sm text-muted-foreground">
          No recent activity to display.
        </div>
      ) : (
        <div className="rounded-xl border bg-card divide-y" role="feed" aria-label="Live activity feed">
          {items.map((item) => (
            <div key={item.id} className="px-4">
              <ActivityFeedItemComponent item={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
