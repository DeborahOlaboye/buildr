import React from "react";
import Link from "next/link";
import { FileCode2, GitCommit, Coins, PackagePlus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/utils";
import type { ActivityFeedItem, ActivityEventType } from "@/types";

const EVENT_META: Record<
  ActivityEventType,
  { label: string; icon: React.ReactNode; badgeClass: string }
> = {
  contract_deployed: {
    label: "Contract",
    icon: <FileCode2 className="h-3.5 w-3.5" />,
    badgeClass: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  },
  github_push: {
    label: "GitHub",
    icon: <GitCommit className="h-3.5 w-3.5" />,
    badgeClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  reward_claimed: {
    label: "Reward",
    icon: <Coins className="h-3.5 w-3.5" />,
    badgeClass: "bg-green-500/10 text-green-600 border-green-500/20",
  },
  ecosystem_joined: {
    label: "Ecosystem",
    icon: <PackagePlus className="h-3.5 w-3.5" />,
    badgeClass: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
};

interface ActivityFeedItemProps {
  item: ActivityFeedItem;
}

export default function ActivityFeedItemComponent({ item }: ActivityFeedItemProps) {
  const meta = EVENT_META[item.eventType];
  const initials = item.builderName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-start gap-3 py-3">
      {/* Avatar */}
      <Link
        href={`/builders/${item.builderHandle}`}
        className="shrink-0"
        aria-label={`View ${item.builderName}'s profile`}
        tabIndex={-1}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={item.avatarUrl} alt="" />
          <AvatarFallback className="text-xs" aria-hidden="true">{initials}</AvatarFallback>
        </Avatar>
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-sm leading-snug">
          <Link
            href={`/builders/${item.builderHandle}`}
            className="font-semibold hover:text-primary transition-colors"
          >
            @{item.builderHandle}
          </Link>{" "}
          <span className="text-muted-foreground">{item.description}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          <time dateTime={item.timestamp}>{formatRelativeTime(item.timestamp)}</time>
        </p>
      </div>

      {/* Event type badge */}
      <span
        className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium shrink-0 ${meta.badgeClass}`}
        aria-label={meta.label}
      >
        <span aria-hidden="true">{meta.icon}</span>
        <span aria-hidden="true">{meta.label}</span>
      </span>
    </div>
  );
}
