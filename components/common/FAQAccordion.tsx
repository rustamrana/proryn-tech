'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn('w-full', className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-b border-brand-border bg-white last:border-b-0"
        >
          <AccordionTrigger className="px-6 py-5 font-poppins text-base font-medium text-brand-primary hover:no-underline hover:text-brand-secondary transition-colors duration-200 [&[data-state=open]]:text-brand-secondary">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-5">
            <p className="font-inter text-base leading-relaxed text-slate-600">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
