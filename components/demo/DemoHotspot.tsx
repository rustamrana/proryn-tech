'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Hotspot } from './demo-data';

interface DemoHotspotProps {
  hotspot: Hotspot;
}

export default function DemoHotspot({ hotspot }: DemoHotspotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className="absolute z-10"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      ref={tooltipRef}
    >
      {/* Pulsing circle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Learn about ${hotspot.label}`}
        aria-expanded={isOpen}
        className="group relative flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        {/* Outer pulse ring */}
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        {/* Middle ring */}
        <span className="absolute inset-1 rounded-full bg-white/20 ring-2 ring-white/50" />
        {/* Inner dot */}
        <span className="relative h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 transition-transform group-hover:scale-125" />
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2 }}
            role="tooltip"
            className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-xl border border-white/20 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-sm"
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close tooltip"
              className="absolute right-2 top-2 rounded-full p-1 text-slate-400 hover:bg-slate-700 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="font-poppins text-sm font-semibold text-white">
              {hotspot.label}
            </p>
            <p className="mt-1.5 font-inter text-xs leading-relaxed text-slate-300">
              {hotspot.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
