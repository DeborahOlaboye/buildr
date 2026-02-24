import React, { useState } from "react";
import { Wallet, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ConnectWalletStepProps {
  onConnected: (address: string) => void;
}

export default function ConnectWalletStep({ onConnected }: ConnectWalletStepProps) {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleConnect() {
    const trimmed = address.trim();
    if (!trimmed.startsWith("SP") || trimmed.length < 20) {
      setError("Please enter a valid Stacks wallet address (starts with SP…).");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate async connection
    setTimeout(() => {
      setLoading(false);
      onConnected(trimmed);
    }, 900);
  }

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8 space-y-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto">
        <Wallet className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold">Connect your Stacks wallet</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Paste your Stacks wallet address to start tracking your onchain activity and earn $STX rewards.
        </p>
      </div>

      <div className="space-y-3 max-w-sm mx-auto">
        <Input
          placeholder="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="font-mono text-xs"
          aria-label="Stacks wallet address"
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        <Button
          className="w-full gap-2"
          onClick={handleConnect}
          disabled={loading || !address.trim()}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Connecting…
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Connect Wallet
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Read-only access — we never request signing keys.
      </p>
    </div>
  );
}
