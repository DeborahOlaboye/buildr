"use client";

import React, { useState } from "react";
import { Zap } from "lucide-react";
import ConnectStepIndicator from "@/components/connect/ConnectStepIndicator";
import ConnectWalletStep from "@/components/connect/ConnectWalletStep";
import ConnectGitHubStep from "@/components/connect/ConnectGitHubStep";
import ConnectCompleteState from "@/components/connect/ConnectCompleteState";

const STEPS = [
  { label: "Connect Wallet" },
  { label: "Connect GitHub" },
  { label: "All Done" },
];

type Step = 0 | 1 | 2;

export default function ConnectPage() {
  const [step, setStep] = useState<Step>(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [githubHandle, setGithubHandle] = useState("");

  function handleWalletConnected(address: string) {
    setWalletAddress(address);
    setStep(1);
  }

  function handleGitHubConnected(handle: string) {
    setGithubHandle(handle);
    setStep(2);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mx-auto">
            <Zap className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Join Buildr
          </h1>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Two quick steps to start earning $STX rewards for your Stacks contributions.
          </p>
        </div>

        {/* Step indicator */}
        {step < 2 && (
          <ConnectStepIndicator
            steps={STEPS.slice(0, 2)}
            currentStep={step}
            completedSteps={step > 0 ? [0] : []}
          />
        )}

        {/* Step content */}
        {step === 0 && (
          <ConnectWalletStep onConnected={handleWalletConnected} />
        )}
        {step === 1 && (
          <ConnectGitHubStep onConnected={handleGitHubConnected} />
        )}
        {step === 2 && (
          <ConnectCompleteState
            walletAddress={walletAddress}
            githubHandle={githubHandle}
          />
        )}
      </div>
    </div>
  );
}
