"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minus } from "lucide-react";
import { matchFAQ } from "./chatbot-data";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Hello 👋\nWelcome to PRORYN AI.\nHow can I help your business today?",
  timestamp: new Date(),
};

const STORAGE_KEY = "proryn-chat-session";

const QUICK_ACTIONS = [
  "Book Consultation",
  "Explore Products",
  "Request Demo",
  "Talk to Sales",
  "BusinessOS",
  "Pricing",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadSession(): Message[] {
  if (typeof window === "undefined") return [GREETING_MESSAGE];
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Message[];
      return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
    }
  } catch {
    // Ignore parse errors
  }
  return [GREETING_MESSAGE];
}

function saveSession(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Ignore storage errors
  }
}

// ─── Custom SVG Icon: PRORYN "P" + Chat Bubble + AI Spark ───────────────────

function ProrynIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Chat bubble outline */}
      <path
        d="M12 10h40a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H28l-10 8v-8h-6a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Abstract "P" letterform */}
      <path
        d="M24 22v16M24 22h8a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5h-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* AI spark dots */}
      <circle cx="44" cy="18" r="1.8" fill="currentColor" opacity="0.9" />
      <circle cx="48" cy="22" r="1.2" fill="currentColor" opacity="0.7" />
      <circle cx="42" cy="14" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

// ─── Avatar Component ────────────────────────────────────────────────────────

function AssistantAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] flex items-center justify-center flex-shrink-0 shadow-sm">
      <span className="text-[11px] font-bold text-white select-none">P</span>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadSession());
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Persist messages to sessionStorage
  useEffect(() => {
    saveSession(messages);
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'button, input, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTab = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleTab);
    return () => panel.removeEventListener("keydown", handleTab);
  }, [isOpen, messages]);

  const processMessage = useCallback((userText: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: userText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowQuickActions(false);
    setIsTyping(true);

    const delay = 250 + Math.random() * 200;

    setTimeout(() => {
      const faqAnswer = matchFAQ(userText);
      const response: Message = {
        id: generateId(),
        role: "assistant",
        content:
          faqAnswer ||
          "I appreciate your question! For detailed assistance on this topic, please reach out to our team directly:\n\n📧 info@proryntech.com\n📞 +91 90397 30924\n\nOr visit our Contact page — we typically respond within 24 hours.",
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, delay);
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    processMessage(trimmed);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    processMessage(action);
  };

  return (
    <>
      {/* ═══ Floating Trigger Button ═══ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -4, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              scale: { type: "spring", stiffness: 300, damping: 20 },
              opacity: { duration: 0.2 },
              y: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="
              fixed z-50
              bottom-6 right-6
              max-sm:bottom-[18px] max-sm:right-[18px]
              w-14 h-14 rounded-full
              bg-gradient-to-br from-[#2563EB] to-[#0EA5E9]
              text-white
              flex items-center justify-center
              cursor-pointer
              transition-shadow duration-300
              focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2
            "
            style={{
              boxShadow: "0 8px 32px rgba(37, 99, 235, 0.35)",
            }}
            aria-label="Open PRORYN AI assistant"
          >
            <ProrynIcon className="w-8 h-8" />

            {/* Green online indicator */}
            <span
              className="
                absolute top-0.5 right-0.5
                w-3 h-3
                bg-[#22C55E] rounded-full
                border-2 border-white
                animate-[pulse_3s_ease-in-out_infinite]
              "
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══ Chat Window ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="PRORYN AI Chat"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="
              fixed z-50
              bottom-6 right-6
              w-[420px] h-[650px]
              max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:top-0
              max-sm:w-full max-sm:h-full max-sm:rounded-none
              bg-white
              rounded-3xl
              border border-black/[0.06]
              flex flex-col overflow-hidden
            "
            style={{
              boxShadow: "0 25px 80px rgba(15, 23, 42, 0.25)",
            }}
          >
            {/* ─── Header ─── */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] rounded-t-3xl max-sm:rounded-t-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/20">
                  <span className="text-sm font-bold text-white select-none">
                    P
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-[Inter,sans-serif] tracking-tight">
                      PRORYN AI
                    </h3>
                    <span className="w-2 h-2 bg-[#22C55E] rounded-full" />
                  </div>
                  <p className="text-xs text-white/70">
                    Enterprise Business Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/15 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4 text-white/90" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/15 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-white/90" />
                </button>
              </div>
            </div>

            {/* ─── Messages Area ─── */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scroll-smooth bg-white">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2.5 max-w-[82%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      {!isUser && <AssistantAvatar />}

                      {/* Bubble */}
                      <div
                        className={`
                          px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap
                          ${
                            isUser
                              ? "bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-white rounded-2xl rounded-br-md shadow-sm"
                              : "bg-slate-100 text-slate-800 rounded-2xl rounded-bl-md"
                          }
                        `}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5"
                >
                  <AssistantAvatar />
                  <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Quick Actions ─── */}
            {showQuickActions && messages.length <= 1 && (
              <div className="px-5 py-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action, index) => (
                    <motion.button
                      key={action}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => handleQuickAction(action)}
                      className="
                        px-3.5 py-1.5 text-xs font-medium rounded-full
                        bg-[#2563EB]/5 text-[#2563EB]
                        border border-[#2563EB]/20
                        hover:bg-[#2563EB]/10 hover:border-[#2563EB]/30
                        transition-colors duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40
                      "
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Input Area ─── */}
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Ask PRORYN AI..."
                  className="
                    flex-1 px-4 py-3 text-sm
                    bg-white
                    border border-slate-200
                    rounded-xl
                    text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]/50
                    transition-all duration-200
                  "
                  aria-label="Chat message input"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="
                    w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0
                    bg-gradient-to-br from-[#2563EB] to-[#0EA5E9]
                    text-white
                    hover:shadow-lg hover:shadow-[#2563EB]/25
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2
                    active:scale-95
                  "
                  aria-label="Send message"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-2.5 text-center select-none">
                Powered by PRORYN AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
