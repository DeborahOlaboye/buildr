import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { PricingFAQItem } from "@/types";

interface PricingFAQProps {
  items: PricingFAQItem[];
}

export default function PricingFAQ({ items }: PricingFAQProps) {
  return (
    <section className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-2 text-center">
        <HelpCircle className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Billing & Membership FAQ</h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-sm font-medium text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
