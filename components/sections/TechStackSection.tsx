'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, Server, Database, Cloud, Cpu, MessageSquare, ArrowRight, type LucideIcon } from 'lucide-react';

// ─── SVG Logo Components ────────────────────────────────────────────────────

function ReactLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="3.5" fill="#61DAFB"/>
      <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
      <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/>
      <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/>
    </svg>
  );
}

function NextJsLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#000000"/>
      <path d="M13 28V14l12 16V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 21.5h9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function AngularLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 3L4 9l2.5 21.5L20 37l13.5-6.5L36 9L20 3z" fill="#DD0031"/>
      <path d="M20 3v34l13.5-6.5L36 9L20 3z" fill="#C3002F"/>
      <path d="M20 8.5L11 29h3.3l1.8-4.5h7.8l1.8 4.5H29L20 8.5zm0 6l2.8 7h-5.6L20 14.5z" fill="white"/>
    </svg>
  );
}

function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="4" fill="#3178C6"/>
      <path d="M8 22h6v2.5H10.5V32H8V22z" fill="white"/>
      <path d="M17 22h8v2.5h-2.75V32H19.75V24.5H17V22z" fill="white"/>
      <path d="M26 28.5c0 1.9 1.2 3.7 4 3.7 2.5 0 4-1.5 4-3.5 0-2-1.2-2.9-3-3.5l-1-.3c-.8-.3-1.2-.6-1.2-1.2 0-.6.5-1 1.3-1 .9 0 1.4.5 1.5 1.4l2.4-.3c-.2-2-1.6-3.1-3.8-3.1-2.3 0-3.8 1.3-3.8 3.2 0 1.8 1.1 2.8 2.8 3.3l1 .3c.9.3 1.4.7 1.4 1.4 0 .7-.5 1.2-1.5 1.2-1.1 0-1.8-.6-1.9-1.7L26 28.5z" fill="white"/>
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 8C15.5 8 12.8 10.2 11.5 14.5c1.8-2.4 3.9-3.3 6.3-2.7 1.4.3 2.3 1.3 3.4 2.4C23 16.1 25.2 18 29.5 18c4.5 0 7.2-2.2 8.5-6.5-1.8 2.4-3.9 3.3-6.3 2.7-1.4-.3-2.3-1.3-3.4-2.4C26.5 9.9 24.3 8 20 8z" fill="#06B6D4"/>
      <path d="M11.5 20c-4.5 0-7.2 2.2-8.5 6.5 1.8-2.4 3.9-3.3 6.3-2.7 1.4.3 2.3 1.3 3.4 2.4 1.8 1.9 4 3.8 8.3 3.8 4.5 0 7.2-2.2 8.5-6.5-1.8 2.4-3.9 3.3-6.3 2.7-1.4-.3-2.3-1.3-3.4-2.4C18 21.9 15.8 20 11.5 20z" fill="#06B6D4"/>
    </svg>
  );
}

function Html5Logo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5 4l3 33 12 3 12-3 3-33H5z" fill="#E44D26"/>
      <path d="M20 37.5V6.5h14l-2.6 28.8L20 37.5z" fill="#F16529"/>
      <path d="M20 18h7l-.5 5H20v5h6l-.7 7.5-5.3 1.5v-5.2l3.5-.9.3-3.4H20V18z" fill="white"/>
      <path d="M20 18v5H13.5l-.5-5H20zm0 10.2v5.2l-5.3-1.5-.3-3.7H12l.5 5.5 7.5 2.1V28.2z" fill="#EBEBEB"/>
    </svg>
  );
}

function JavaLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15 28.5s-1.5.9 1 1.2c3 .3 4.5.3 7.8-.3 0 0 .9.5 2.1 1-7.5 3.2-16.9-.2-10.9-1.9z" fill="#EA2D2E"/>
      <path d="M13.8 25s-1.7 1.2.9 1.5c3.2.3 5.7.4 10-.6 0 0 .6.6 1.6 1-8.9 2.6-18.8.2-12.5-1.9z" fill="#EA2D2E"/>
      <path d="M20 16c2.4 2.7-0.6 5.1-0.6 5.1s6.1-3.1 3.3-7c-2.6-3.6-4.6-5.4 6.2-11.6 0 0-16.9 4.2-8.9 13.5z" fill="#EA2D2E"/>
      <path d="M28.8 31.4s1.1.9-1.2 1.6c-4.4 1.3-18.3 1.7-22.2 0-1.4-.6 1.2-1.5 2-.1.3.6.5.7-1.6 1.2 1.5.7 10.4.9 14.5-.3 1-.5 1.4-1.4.5-2.4z" fill="#3A75B4"/>
      <path d="M16 34.5s-.7.5.8.7c2.2.2 5.2.2 8.1-.3 0 0 .5.3 1.2.5-4 1-9.8.9-11.3-.2-.4-.3.4-.7 1.2-.7z" fill="#3A75B4"/>
      <path d="M18.5 22.3c-4.2-1.1-1.7-6.3 0-5.7 1.5.5 2.3 1.3 1.1 3.8-1 2.1 0 3.4 0 3.4s-2-.7-1.1-1.5z" fill="#EA2D2E"/>
    </svg>
  );
}

function SpringLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#6DB33F"/>
      <path d="M28 11c-1.5 2-4 3.5-7.5 3.5-6 0-9.5-4.5-9.5-4.5s1 6 7.5 8.5c5 2 10 .5 11.5-3.5" fill="white" opacity="0.9"/>
      <circle cx="29" cy="10.5" r="2" fill="white"/>
      <path d="M12 22.5c0 4.7 3.8 8.5 8.5 8.5s8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5-8.5 3.8-8.5 8.5z" fill="white" opacity="0.2"/>
      <path d="M16 22.5l2.5 2.5L27 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function NodeLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 3L4 12.5v15L20 37l16-9.5v-15L20 3z" fill="#339933"/>
      <path d="M20 3L4 12.5v15L20 37V3z" fill="#3C873A"/>
      <path d="M20 10c0 0-3.5 2-3.5 6.5s3.5 6.5 3.5 6.5 3.5-2 3.5-6.5S20 10 20 10z" fill="white" opacity="0.8"/>
      <circle cx="20" cy="16.5" r="3" fill="white"/>
    </svg>
  );
}

function PythonLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4c-8.8 0-8.3 3.8-8.3 3.8v4h8.5v1.2H8.8S4 12.5 4 21.3s4.3 8.5 4.3 8.5h2.5v-4.1s-.1-4.3 4.2-4.3h7.4s4-.1 4-3.9V8.2S26.9 4 20 4zm-2.3 2.5c.7 0 1.3.6 1.3 1.3S18.4 9.1 17.7 9.1s-1.3-.6-1.3-1.3.6-1.3 1.3-1.3z" fill="#3776AB"/>
      <path d="M20.3 36c8.8 0 8.3-3.8 8.3-3.8v-4h-8.5v-1.2h11.4s4.8.5 4.8-8.3-4.3-8.5-4.3-8.5H29.5v4.1s.1 4.3-4.2 4.3H18s-4 .1-4 3.9v7.3S13.4 36 20.3 36zm2.3-2.5c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3z" fill="#FFD43B"/>
    </svg>
  );
}

function PostgresLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="20" cy="15" rx="12" ry="10" fill="#336791"/>
      <path d="M8 15v10c0 5.5 5.4 10 12 10s12-4.5 12-10V15" fill="#336791"/>
      <ellipse cx="20" cy="15" rx="12" ry="5" fill="#4F90C3"/>
      <path d="M14 19v8M20 17v10M26 19v8" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

function MySQLLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4C11.2 4 4 11.2 4 20s7.2 16 16 16 16-7.2 16-16S28.8 4 20 4z" fill="#00758F"/>
      <path d="M14 13h3l4 8 4-8h3l-6 14h-2L14 13z" fill="white"/>
      <path d="M12 13h2v14h-2V13zm14 0h2v14h-2V13z" fill="white" opacity="0.7"/>
    </svg>
  );
}

function MongoLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4c-1 4-4 7-4 13 0 4.4 1.8 8.4 4 10 2.2-1.6 4-5.6 4-10 0-6-3-9-4-13z" fill="#47A248"/>
      <path d="M20 27l-1 9h2l-1-9z" fill="#47A248" opacity="0.8"/>
    </svg>
  );
}

function RedisLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 22.5l16 7 16-7-16-7-16 7z" fill="#D82C20"/>
      <path d="M4 17.5l16 7 16-7-16-7-16 7z" fill="#FF6B6B"/>
      <path d="M4 17.5l16 7V31l-16-7V17.5z" fill="#B21912"/>
      <path d="M36 17.5l-16 7V31l16-7V17.5z" fill="#D82C20"/>
    </svg>
  );
}

function OracleLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#F80000"/>
      <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="bold">Ora</text>
    </svg>
  );
}

function AWSLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 18.5c-3.3 1.4-5.5 3.3-5.5 5.5 0 3.9 5.9 7 13.5 7s13.5-3.1 13.5-7c0-2.2-2.2-4.1-5.5-5.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M14 22l2-8 2.5 5.5 2-4 2.5 5.5 2-5.5 2 8" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function AzureLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 4L8 24h8l-4 8 16-20h-10L20 4z" fill="#0078D4"/>
      <path d="M12 32l20-4-8-4-12 8z" fill="#0078D4" opacity="0.7"/>
    </svg>
  );
}

function DockerLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="20" width="28" height="14" rx="2" fill="#0DB7ED"/>
      <rect x="8" y="22" width="5" height="4" rx="1" fill="white"/>
      <rect x="15" y="22" width="5" height="4" rx="1" fill="white"/>
      <rect x="22" y="22" width="5" height="4" rx="1" fill="white"/>
      <rect x="15" y="16" width="5" height="4" rx="1" fill="#0DB7ED"/>
      <rect x="22" y="16" width="5" height="4" rx="1" fill="#0DB7ED"/>
      <path d="M34 22s2-1 2-4c-2-1-4 0-4 0" stroke="#0DB7ED" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="34" cy="16" r="2" fill="#0DB7ED"/>
    </svg>
  );
}

function KubernetesLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="#326CE5"/>
      <path d="M20 8l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7z" fill="white" opacity="0.9"/>
      <circle cx="20" cy="20" r="3" fill="white"/>
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#24292E"/>
      <path d="M20 6C12.3 6 6 12.3 6 20c0 6.2 4 11.4 9.5 13.3.7.1 1-.3 1-.7v-2.5c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.8-3.1-.4-6.4-1.6-6.4-7 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.8 1.4 1.1-.3 2.3-.5 3.4-.5 1.2 0 2.3.2 3.4.5 2.7-1.8 3.8-1.4 3.8-1.4.7 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.5-3.3 6.7-6.5 7 .5.4 1 1.3 1 2.6v3.9c0 .4.3.8 1 .7C30 31.4 34 26.2 34 20c0-7.7-6.3-14-14-14z" fill="white"/>
    </svg>
  );
}

function GitHubActionsLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="#2088FF"/>
      <path d="M14 14l6 6-6 6M22 26h4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RabbitMQLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="6" fill="#FF6600"/>
      <rect x="9" y="17" width="8" height="8" rx="1" fill="white"/>
      <rect x="16" y="10" width="8" height="8" rx="1" fill="white"/>
      <rect x="23" y="17" width="8" height="8" rx="1" fill="white"/>
      <rect x="16" y="24" width="8" height="8" rx="1" fill="white"/>
    </svg>
  );
}

function KafkaLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#231F20"/>
      <circle cx="20" cy="11" r="3" fill="white"/>
      <circle cx="11" cy="26" r="3" fill="white"/>
      <circle cx="29" cy="26" r="3" fill="white"/>
      <path d="M20 14v7M17 20l-4 4M23 20l4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function GraphQLLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20 5l13.5 7.5v15L20 35 6.5 27.5v-15L20 5z" stroke="#E535AB" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="5" r="2.5" fill="#E535AB"/>
      <circle cx="33.5" cy="12.5" r="2.5" fill="#E535AB"/>
      <circle cx="33.5" cy="27.5" r="2.5" fill="#E535AB"/>
      <circle cx="20" cy="35" r="2.5" fill="#E535AB"/>
      <circle cx="6.5" cy="27.5" r="2.5" fill="#E535AB"/>
      <circle cx="6.5" cy="12.5" r="2.5" fill="#E535AB"/>
      <circle cx="20" cy="20" r="3.5" fill="#E535AB"/>
    </svg>
  );
}

function WebSocketLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke="#4F46E5" strokeWidth="2" fill="none"/>
      <path d="M12 20c0-4.4 3.6-8 8-8" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M28 20c0 4.4-3.6 8-8 8" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 16l8 8M24 16l-8 8" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function OpenAILogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="#10A37F"/>
      <path d="M20 10a5 5 0 0 1 4.8 3.5c1.5.5 2.7 1.6 3.3 3.1a5 5 0 0 1 0 6.8 5 5 0 0 1-3.3 3.1A5 5 0 0 1 20 30a5 5 0 0 1-4.8-3.5 5 5 0 0 1-3.3-3.1 5 5 0 0 1 0-6.8 5 5 0 0 1 3.3-3.1A5 5 0 0 1 20 10z" stroke="white" strokeWidth="1.5" fill="none"/>
      <circle cx="20" cy="20" r="4" fill="white"/>
    </svg>
  );
}

function LangChainLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="8" fill="#1C3F3A"/>
      <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#1BFF9E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="20" cy="20" r="3" fill="#1BFF9E"/>
      <path d="M17 26l3-3 3 3" stroke="#1BFF9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function OCRLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="8" width="32" height="24" rx="3" stroke="#6366F1" strokeWidth="2" fill="none"/>
      <path d="M10 16h6M10 20h12M10 24h8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 14l4 4-4 4" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AIAutoLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="#7C3AED"/>
      <path d="M13 27l4-14 3 9 3-9 4 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="13" r="2" fill="white"/>
    </svg>
  );
}

function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#25D366"/>
      <path d="M20 9.5C14.2 9.5 9.5 14.2 9.5 20c0 1.9.5 3.7 1.4 5.3L9 31l5.8-1.5c1.5.8 3.2 1.2 5 1.2C25.8 30.7 30.5 26 30.5 20S25.8 9.5 20 9.5z" fill="white" opacity="0.2"/>
      <path d="M25.5 22.8c-.3-.1-1.7-.9-2-.9-.2-.1-.4-.1-.6.1-.2.2-.7.9-.9 1-.1.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.8-1.4-1.7-1.5-2-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.3-.4 0-.2 0-.3-.1-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.2.2 2 3 4.7 4.2 2.7 1.1 2.7.7 3.1.7.5 0 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.2 0-.1-.2-.2-.5-.3z" fill="white"/>
    </svg>
  );
}

function RestAPILogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="4" width="32" height="32" rx="6" fill="#059669"/>
      <path d="M11 15h18M11 20h14M11 25h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="29" cy="25" r="4" fill="white" opacity="0.9"/>
      <path d="M27 25l1.5 1.5L31 23" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function MicroservicesLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="10" r="5" fill="#3B82F6"/>
      <circle cx="8" cy="30" r="5" fill="#3B82F6"/>
      <circle cx="32" cy="30" r="5" fill="#3B82F6"/>
      <path d="M20 15v4M16 24l-5 3M24 24l5 3" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="21" r="3" fill="#1D4ED8"/>
    </svg>
  );
}

// ─── Technology Data ─────────────────────────────────────────────────────────

interface Tech {
  logo: React.ReactNode;
  name: string;
  description: string;
}

interface Category {
  icon: LucideIcon;
  title: string;
  description: string;
  techs: Tech[];
  accent: string;
  bg: string;
}

const CATEGORIES: Category[] = [
  {
    icon: Monitor,
    title: 'Frontend Technologies',
    description: 'Modern frameworks and tools for building high-performance, accessible web interfaces.',
    accent: 'text-blue-600',
    bg: 'bg-blue-50',
    techs: [
      { logo: <ReactLogo />, name: 'React', description: 'Modern UI library for building interactive web applications.' },
      { logo: <NextJsLogo />, name: 'Next.js', description: 'Full-stack React framework with SSR, SSG, and edge support.' },
      { logo: <AngularLogo />, name: 'Angular', description: 'Enterprise-grade framework for large-scale frontend applications.' },
      { logo: <TypeScriptLogo />, name: 'TypeScript', description: 'Strongly typed JavaScript for safer, more maintainable code.' },
      { logo: <TailwindLogo />, name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid, consistent UI development.' },
      { logo: <Html5Logo />, name: 'HTML5', description: 'Modern semantic markup for structured, accessible web content.' },
    ],
  },
  {
    icon: Server,
    title: 'Backend Technologies',
    description: 'Robust server-side technologies for enterprise APIs, microservices, and business logic.',
    accent: 'text-emerald-600',
    bg: 'bg-emerald-50',
    techs: [
      { logo: <JavaLogo />, name: 'Java', description: 'Proven enterprise language for high-performance, mission-critical systems.' },
      { logo: <SpringLogo />, name: 'Spring Boot', description: 'Enterprise Java framework for scalable, production-ready backends.' },
      { logo: <NodeLogo />, name: 'Node.js', description: 'High-concurrency JavaScript runtime for real-time applications and APIs.' },
      { logo: <PythonLogo />, name: 'Python', description: 'Versatile language for AI/ML, automation, and data processing.' },
      { logo: <RestAPILogo />, name: 'REST API', description: 'Standard architectural style for scalable, stateless API design.' },
      { logo: <MicroservicesLogo />, name: 'Microservices', description: 'Independently deployable services architecture for enterprise scale.' },
    ],
  },
  {
    icon: Database,
    title: 'Databases',
    description: 'Relational, document, and in-memory stores chosen for reliability, performance, and scale.',
    accent: 'text-violet-600',
    bg: 'bg-violet-50',
    techs: [
      { logo: <PostgresLogo />, name: 'PostgreSQL', description: 'Advanced open-source relational database for complex enterprise data.' },
      { logo: <MySQLLogo />, name: 'MySQL', description: 'World\'s most popular open-source relational database management system.' },
      { logo: <MongoLogo />, name: 'MongoDB', description: 'Flexible document database for modern, schema-free applications.' },
      { logo: <RedisLogo />, name: 'Redis', description: 'Ultra-fast in-memory data store for caching and real-time operations.' },
      { logo: <OracleLogo />, name: 'Oracle Database', description: 'Enterprise-class RDBMS for mission-critical, high-volume workloads.' },
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Cloud platforms and automation tooling for reliable, scalable, and secure deployments.',
    accent: 'text-sky-600',
    bg: 'bg-sky-50',
    techs: [
      { logo: <AWSLogo />, name: 'AWS', description: 'Leading cloud platform with 200+ managed services for enterprise workloads.' },
      { logo: <AzureLogo />, name: 'Azure', description: 'Microsoft\'s enterprise cloud with deep compliance and hybrid capabilities.' },
      { logo: <DockerLogo />, name: 'Docker', description: 'Containerization platform for consistent, portable application deployments.' },
      { logo: <KubernetesLogo />, name: 'Kubernetes', description: 'Container orchestration for auto-scaling, self-healing production deployments.' },
      { logo: <GitHubLogo />, name: 'GitHub', description: 'Version control and collaboration platform powering modern engineering teams.' },
      { logo: <GitHubActionsLogo />, name: 'GitHub Actions', description: 'Automated CI/CD pipelines directly integrated with your source repository.' },
    ],
  },
  {
    icon: MessageSquare,
    title: 'Messaging & Integration',
    description: 'Reliable messaging and integration patterns for event-driven, decoupled enterprise systems.',
    accent: 'text-orange-600',
    bg: 'bg-orange-50',
    techs: [
      { logo: <RabbitMQLogo />, name: 'RabbitMQ', description: 'Reliable message broker for asynchronous microservice communication.' },
      { logo: <KafkaLogo />, name: 'Apache Kafka', description: 'Distributed event streaming platform for high-throughput data pipelines.' },
      { logo: <RestAPILogo />, name: 'REST API', description: 'Universal API design standard for interoperable system integrations.' },
      { logo: <GraphQLLogo />, name: 'GraphQL', description: 'Flexible query language giving clients precise control over API data fetching.' },
      { logo: <WebSocketLogo />, name: 'WebSocket', description: 'Full-duplex communication protocol for real-time, bidirectional applications.' },
    ],
  },
  {
    icon: Cpu,
    title: 'Artificial Intelligence',
    description: 'AI platforms, LLM frameworks, and automation tools for intelligent enterprise applications.',
    accent: 'text-purple-600',
    bg: 'bg-purple-50',
    techs: [
      { logo: <OpenAILogo />, name: 'OpenAI', description: 'GPT-4 and embedding models for conversational AI and intelligent automation.' },
      { logo: <LangChainLogo />, name: 'LangChain', description: 'Framework for building LLM-powered applications with memory and tool use.' },
      { logo: <OCRLogo />, name: 'OCR', description: 'Optical character recognition for digitizing documents and automating data entry.' },
      { logo: <AIAutoLogo />, name: 'AI Automation', description: 'Intelligent workflow automation using machine learning and predictive models.' },
      { logo: <WhatsAppLogo />, name: 'WhatsApp Business API', description: 'Enterprise WhatsApp integration for automated customer communication at scale.' },
    ],
  },
];

// ─── Tech Card ───────────────────────────────────────────────────────────────

function TechCard({ logo, name, description, index, accent }: {
  logo: React.ReactNode;
  name: string;
  description: string;
  index: number;
  accent: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group flex flex-col rounded-2xl border border-brand-border bg-white p-5 shadow-card cursor-pointer transition-shadow duration-300 hover:shadow-card-hover hover:border-slate-300"
    >
      {/* Logo */}
      <div className="mb-4 h-10 w-10 flex-shrink-0">
        {logo}
      </div>

      {/* Name */}
      <h4 className={`mb-1.5 font-poppins text-sm font-bold text-brand-primary group-hover:${accent} transition-colors duration-200`}>
        {name}
      </h4>

      {/* Description */}
      <p className="font-inter text-xs leading-relaxed text-slate-500 flex-1">
        {description}
      </p>
    </motion.div>
  );
}

// ─── Category Block ───────────────────────────────────────────────────────────

function CategoryBlock({ category, catIndex }: { category: Category; catIndex: number }) {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: catIndex * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Category header */}
      <div className="mb-6 flex items-center gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${category.bg}`}>
          <Icon className={`h-6 w-6 ${category.accent}`} />
        </div>
        <div>
          <h3 className="font-poppins text-lg font-bold text-brand-primary">{category.title}</h3>
          <p className="font-inter text-sm text-slate-500 leading-snug max-w-xs">{category.description}</p>
        </div>
      </div>

      {/* Tech grid — 2 cols on mobile, 3 on sm, 6 on lg (auto-fill within category) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {category.techs.map((tech, i) => (
          <TechCard
            key={tech.name}
            logo={tech.logo}
            name={tech.name}
            description={tech.description}
            index={i}
            accent={category.accent}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TechStackSection() {
  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="tech-stack-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-brand-accent/10 px-4 py-1.5 font-inter text-sm font-semibold text-brand-accent">
            Modern Technology Stack
          </span>
          <h2 id="tech-stack-heading" className="font-poppins text-4xl font-extrabold text-brand-primary sm:text-5xl">
            Technologies Powering
            <br className="hidden sm:block" />
            Enterprise Innovation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-lg leading-relaxed text-slate-600">
            We leverage modern frameworks, cloud platforms, AI technologies, and enterprise tools to build
            secure, scalable, and future-ready digital solutions for startups, SMEs, enterprises, and
            government organizations.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-14">
          {CATEGORIES.map((cat, i) => (
            <CategoryBlock key={cat.title} category={cat} catIndex={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-primary via-[#0e2048] to-[#1a3a6e] p-[1px]"
        >
          <div className="rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1e3a6e] px-8 py-12 text-center">
            <p className="mb-2 font-inter text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Let&apos;s Build Together
            </p>
            <h3 className="font-poppins text-3xl font-bold text-white sm:text-4xl">
              Ready to Build Future-Ready Software?
            </h3>
            <p className="mx-auto mt-4 max-w-xl font-inter text-base text-white/60">
              Partner with PRORYN TECH to build secure, scalable and AI-powered enterprise applications
              using modern technologies.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-8 py-3.5 font-inter text-sm font-bold text-white shadow-lg shadow-brand-secondary/30 transition-all hover:bg-blue-600 hover:shadow-xl"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 font-inter text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
