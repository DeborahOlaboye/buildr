import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-16 text-center gap-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
        <Zap className="h-8 w-8" />
      </div>
      <div className="space-y-3 max-w-xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Stacks Builder Rewards
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Track your onchain and GitHub activity on Stacks. Connect your Bitcoin
          L2 wallet to earn $STX rewards every month.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" asChild>
          <Link href="/builders" className="gap-2">
            View Leaderboard <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/pricing">Join Stacks+</Link>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        15,000 $STX · 50 Winners · Monthly
      </p>
    </div>
  );
}
