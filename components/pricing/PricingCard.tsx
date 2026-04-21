import React from "react";
import { Check, Zap } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SUPPORT_EMAIL } from "@/lib/constants";
import type { BillingCycle, PricingTier } from "@/types";

interface PricingCardProps {
  tier: PricingTier;
  billing: BillingCycle;
}

export default function PricingCard({ tier, billing }: PricingCardProps) {
  const price =
    billing === "annual" ? tier.annualPrice : tier.monthlyPrice;

  return (
    <Card
      className={cn(
        "relative flex flex-col h-full transition-all duration-200",
        tier.isRecommended
          ? "border-2 border-primary shadow-lg scale-[1.02] bg-card"
          : "hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      {/* Recommended badge */}
      {tier.isRecommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="gap-1 px-3 py-1 text-xs shadow-md">
            <Zap className="h-3 w-3" />
            Recommended
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">{tier.name}</h3>
          <p className="text-sm text-muted-foreground">{tier.tagline}</p>
        </div>

        {/* Price display */}
        <div className="mt-4">
          {price === null ? (
            <div className="text-3xl font-extrabold">Custom</div>
          ) : price === 0 ? (
            <div className="text-3xl font-extrabold">Free</div>
          ) : (
            <div className="flex items-end gap-1">
              <span className="text-3xl font-extrabold">${price}</span>
              <span className="text-sm text-muted-foreground mb-1">/ mo</span>
            </div>
          )}
          {billing === "annual" && price !== null && price > 0 && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
              Billed annually — 2 months free
            </p>
          )}
          {billing === "monthly" && price !== null && price > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Billed monthly
            </p>
          )}
          {price === null && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Tailored to your needs
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <ul className="space-y-2.5" aria-label={`${tier.name} plan features`}>
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check className="h-4 w-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className={cn("w-full gap-2", tier.isRecommended ? "" : "variant-outline")}
          variant={tier.isRecommended ? "default" : "outline"}
          size="lg"
          asChild={tier.id === "enterprise"}
        >
          {tier.id === "enterprise" ? (
            <a href={`mailto:${SUPPORT_EMAIL}`} aria-label={`Contact us at ${SUPPORT_EMAIL}`}>{tier.ctaLabel}</a>
          ) : (
            <span>{tier.ctaLabel}</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
