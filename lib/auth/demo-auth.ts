/**
 * Demo Authentication Helper
 * Client-side only — uses sessionStorage for auth state.
 * Session expires when browser tab/window closes.
 */

const DEMO_USER = {
  email: 'demo@proryntech.com',
  password: 'Demo@123',
  name: 'Rajesh Kumar',
  company: 'Acme Technologies',
};

export interface SessionUser {
  email: string;
  name: string;
  company: string;
}

const SESSION_KEY = 'proryn_portal_session';

export function validateCredentials(
  email: string,
  password: string
): SessionUser | null {
  if (
    email.toLowerCase() === DEMO_USER.email.toLowerCase() &&
    password === DEMO_USER.password
  ) {
    return {
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      company: DEMO_USER.company,
    };
  }
  return null;
}

export function getSession(): SessionUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function setSession(user: SessionUser): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY);
}
