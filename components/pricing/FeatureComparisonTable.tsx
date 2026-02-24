import React from "react";
import { Check, X, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { PricingFeature } from "@/types";

interface FeatureComparisonTableProps {
  features: PricingFeature[];
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="h-4 w-4 text-green-500 mx-auto" />;
  if (value === false)
    return <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  if (value === "—")
    return <Minus className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  return (
    <span className="text-xs font-medium text-foreground text-center block">
      {value}
    </span>
  );
}

export default function FeatureComparisonTable({
  features,
}: FeatureComparisonTableProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-center">
        Full Feature Comparison
      </h2>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/60">
              <TableHead className="w-[40%] text-sm font-semibold">Feature</TableHead>
              <TableHead className="text-center text-sm font-semibold">Free</TableHead>
              <TableHead className="text-center text-sm font-semibold">
                <span className="flex items-center justify-center gap-1.5">
                  Stacks+
                  <Badge className="text-[10px] px-1.5 py-0 h-4">Pro</Badge>
                </span>
              </TableHead>
              <TableHead className="text-center text-sm font-semibold">Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, idx) => (
              <TableRow
                key={feature.label}
                className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}
              >
                <TableCell className="py-3 text-sm font-medium">
                  {feature.label}
                </TableCell>
                <TableCell className="py-3 text-center">
                  <CellValue value={feature.free} />
                </TableCell>
                <TableCell className="py-3 text-center bg-primary/5">
                  <CellValue value={feature.pro} />
                </TableCell>
                <TableCell className="py-3 text-center">
                  <CellValue value={feature.enterprise} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
