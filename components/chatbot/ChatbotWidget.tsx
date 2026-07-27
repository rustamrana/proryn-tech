"use client";

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Minus } from "lucide-react";
import ChatMessage, { type Message } from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import { matchFAQ } from "./chatbot-data";

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "assistant",
  content: "Hi! 👋 I'm PRORYN AI Assistant. How can I help you today?",
  timestamp: new Date(),
};

const STORAGE_KEY = "proryn-chat-session";

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

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => loadSession());
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

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
      setTimeout(() => inputRef.current?.focus(), 300);
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
    setShowQuickReplies(false);
    setIsTyping(true);

    // Simulate slight delay for natural feel (still under 500ms)
    const delay = 200 + Math.random() * 200;

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

  const handleQuickReply = (question: string) => {
    processMessage(question);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="
              fixed bottom-5 right-5 z-50
              w-12 h-12 rounded-full
              bg-brand-secondary
              text-white shadow-lg shadow-brand-secondary/25
              hover:shadow-xl hover:shadow-brand-secondary/35
              hover:scale-105 active:scale-95
              transition-all duration-200
              flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2
            "
            aria-label="Open chat assistant"
          >
            <MessageCircle className="w-5 h-5" />
            {/* Online indicator */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Chat with PRORYN AI Assistant"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="
              fixed z-50
              bottom-6 right-6
              w-[380px] h-[560px]
              max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:top-0
              max-sm:w-full max-sm:h-full max-sm:rounded-none
              bg-white dark:bg-slate-900
              rounded-2xl shadow-2xl shadow-black/20
              border border-slate-200 dark:border-slate-700
              flex flex-col overflow-hidden
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-brand-secondary to-brand-accent">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-sm font-bold text-white">P</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    PRORYN AI Assistant
                  </h3>
                  <p className="text-[11px] text-white/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                    Online • Typically replies instantly
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scroll-smooth">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-brand-secondary to-brand-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">P</span>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {showQuickReplies && messages.length <= 1 && (
              <QuickReplies onSelect={handleQuickReply} />
            )}

            {/* Input area */}
            <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type your message..."
                  className="
                    flex-1 px-4 py-2.5 text-sm
                    bg-white dark:bg-slate-800
                    border border-slate-200 dark:border-slate-600
                    rounded-xl
                    text-slate-800 dark:text-slate-100
                    placeholder:text-slate-400 dark:placeholder:text-slate-500
                    focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary
                    transition-shadow duration-150
                  "
                  aria-label="Chat message input"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="
                    p-2.5 rounded-xl
                    bg-brand-secondary text-white
                    hover:bg-brand-secondary/90
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2
                    active:scale-95
                  "
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center">
                Powered by PRORYN TECH
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
