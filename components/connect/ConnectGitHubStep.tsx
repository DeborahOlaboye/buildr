import React, { useState } from "react";
import { Github, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectGitHubStepProps {
  onConnected: (handle: string) => void;
}

export default function ConnectGitHubStep({ onConnected }: ConnectGitHubStepProps) {
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleConnect() {
    const trimmed = handle.trim().replace(/^@/, "");
    if (!trimmed || trimmed.length < 2) {
      setError("Please enter a valid GitHub username.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConnected(trimmed);
    }, 900);
  }

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8 space-y-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto" aria-hidden="true">
        <Github className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold">Connect your GitHub</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Link your GitHub account so Buildr can track your open-source contributions to the Stacks ecosystem.
        </p>
      </div>

      <div className="space-y-3 max-w-sm mx-auto">
        <div className="flex items-center rounded-md border bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring">
          <span className="pl-3 text-sm text-muted-foreground select-none">github.com/</span>
          <input
            className="flex-1 bg-transparent py-2 pr-3 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="your-handle"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            aria-label="GitHub username"
            aria-describedby={error ? "github-error" : undefined}
            aria-invalid={!!error}
          />
        </div>
        {error && (
          <p id="github-error" role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
        <Button
          className="w-full gap-2"
          onClick={handleConnect}
          disabled={loading || !handle.trim()}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Connecting…</span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Connect GitHub
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        We only read public repository data.
      </p>
    </div>
  );
}
