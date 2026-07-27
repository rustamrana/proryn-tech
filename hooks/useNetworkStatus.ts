'use client';

import { useEffect, useState } from 'react';

/**
 * Represents the current network connection status as reported by
 * the Network Information API (navigator.connection).
 */
export interface NetworkStatus {
  /** Effective connection type: '4g', '3g', '2g', 'slow-2g', or undefined if API unavailable */
  effectiveType: string | undefined;
  /** Whether the user has requested reduced data usage (Data Saver mode) */
  saveData: boolean;
  /** Convenience flag: true for 2g, slow-2g, or when saveData is enabled */
  isSlowConnection: boolean;
}

/** Extended Navigator type including the Network Information API */
interface NetworkInformationConnection {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: EventListener) => void;
  removeEventListener?: (type: string, listener: EventListener) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationConnection;
}

/**
 * Reads the current network status from the Network Information API.
 * Returns safe defaults when the API is unavailable (SSR or unsupported browser).
 */
function getNetworkStatus(): NetworkStatus {
  if (typeof navigator === 'undefined') {
    return { effectiveType: undefined, saveData: false, isSlowConnection: false };
  }

  const nav = navigator as NavigatorWithConnection;
  const connection = nav.connection;

  if (!connection) {
    return { effectiveType: undefined, saveData: false, isSlowConnection: false };
  }

  const effectiveType = connection.effectiveType;
  const saveData = connection.saveData ?? false;
  const isSlowConnection =
    saveData ||
    effectiveType === '2g' ||
    effectiveType === 'slow-2g';

  return { effectiveType, saveData, isSlowConnection };
}

/**
 * Hook that exposes the current network connection quality via the
 * Network Information API. Updates reactively when the connection changes.
 *
 * Safe for SSR: defaults to a "fast" connection on the server.
 *
 * @example
 * ```tsx
 * const { isSlowConnection } = useNetworkStatus();
 * if (isSlowConnection) {
 *   // Show poster image instead of video
 * }
 * ```
 */
export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>(getNetworkStatus);

  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection;

    if (!connection?.addEventListener) return;

    const handleChange = (): void => {
      setStatus(getNetworkStatus());
    };

    connection.addEventListener('change', handleChange);

    return () => {
      connection.removeEventListener?.('change', handleChange);
    };
  }, []);

  return status;
}
