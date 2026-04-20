import React from "react";

export default function ConnectLoading() {
  return (
    <div
      className="container max-w-lg mx-auto py-12 px-4 space-y-8"
      aria-busy="true"
      aria-label="Loading connection flow"
    >
      <div className="flex justify-center">
        <div className="skeleton-shimmer h-12 w-80 rounded-full" aria-hidden="true" />
      </div>
      <div className="rounded-xl border p-8 space-y-6">
        <div className="skeleton-shimmer h-7 w-48 rounded-md" aria-hidden="true" />
        <div className="skeleton-shimmer h-4 w-full rounded-md" aria-hidden="true" />
        <div className="skeleton-shimmer h-4 w-3/4 rounded-md" aria-hidden="true" />
        <div className="skeleton-shimmer h-10 w-full rounded-md" aria-hidden="true" />
        <div className="skeleton-shimmer h-10 w-full rounded-md" aria-hidden="true" />
      </div>
    </div>
  );
}
