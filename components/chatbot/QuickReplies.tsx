"use client";

import { motion } from "framer-motion";

const quickQuestions = [
  "What services do you offer?",
  "Tell me about BusinessOS",
  "What's your pricing?",
  "How can I contact you?",
  "What technologies do you use?",
  "Are you hiring?",
];

interface QuickRepliesProps {
  onSelect: (question: string) => void;
}

export default function QuickReplies({ onSelect }: QuickRepliesProps) {
  return (
    <div className="px-4 py-3">
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
        Quick questions:
      </p>
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question, index) => (
          <motion.button
            key={question}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            onClick={() => onSelect(question)}
            className="
              px-3 py-1.5 text-xs font-medium rounded-full
              bg-brand-secondary/10 text-brand-secondary
              dark:bg-brand-secondary/20 dark:text-blue-300
              hover:bg-brand-secondary/20 dark:hover:bg-brand-secondary/30
              transition-colors duration-150
              border border-brand-secondary/20
              focus:outline-none focus:ring-2 focus:ring-brand-secondary/50
            "
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
