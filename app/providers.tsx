'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode, useState, useRef } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  // Use useRef to ensure the QueryClient is only created once
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          // Aggressive caching for better performance
          staleTime: 10 * 60 * 1000, // 10 minutes
          gcTime: 60 * 60 * 1000, // 1 hour cache retention
          refetchOnWindowFocus: false,
          refetchOnMount: false, // Don't refetch on mount if data is fresh
          refetchOnReconnect: false, // Only refetch on manual triggers
          retry: 1, // Retry once on failure
          retryDelay: 1000, // Wait 1 second before retry
        },
      },
    });
  }

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClientRef.current}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
