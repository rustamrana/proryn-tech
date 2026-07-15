'use client';

import {
  Clock,
  FolderCheck,
  ThumbsUp,
  Building2,
  Brain,
  HeadphonesIcon,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/common/AnimatedCounter';

// --- Types ---

interface NumericMetric {
  kind: 'numeric';
  value: number;
  suffix: string;
  label: string;
  Icon: LucideIcon;
}

interface TextMetric {
  kind: 'text';
  text: string;
  label: string;
  Icon: LucideIcon;
}

type Metric = NumericMetric | TextMetric;

// --- Data ---

const metrics: Metric[] = [
  { kind: 'numeric', value: 10,  suffix: '+', label: 'Years Experience',    Icon: Clock          },
  { kind: 'numeric', value: 100, suffix: '+', label: 'Projects Delivered',  Icon: FolderCheck    },
  { kind: 'numeric', value: 99,  suffix: '%', label: 'Client Satisfaction', Icon: ThumbsUp       },
  { kind: 'text',    text: 'Enterprise', label: 'Ready Solutions',          Icon: Building2      },
  { kind: 'text',    text: 'AI Powered', label: 'Innovation',               Icon: Brain          },
  { kind: 'text',    text: 'Dedicated',  label: 'Support Team',             Icon: HeadphonesIcon },
];

// --- Component ---

export default function TrustIndicators() {
  return (
    <section className="bg-brand-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={[
                'flex flex-col items-center text-center px-4 py-6',
                // Divider: bottom border on mobile, right border from sm up (skip last item)
                i < metrics.length - 1
                  ? 'border-b border-brand-border sm:border-b-0 sm:border-r sm:border-brand-border'
                  : '',
              ]
                .join(' ')
                .trim()}
            >
              {/* Icon — 32×32, brand-secondary */}
              <metric.Icon
                size={32}
                className="mb-2 text-brand-secondary"
                strokeWidth={1.75}
              />

              {metric.kind === 'numeric' ? (
                /* Numeric value — animated counter (renders value + label) */
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                />
              ) : (
                /* Text value — static, same visual treatment */
                <>
                  <p className="font-poppins text-4xl font-bold text-brand-primary">
                    {metric.text}
                  </p>
                  <p className="mt-2 font-inter text-sm text-slate-500">{metric.label}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
