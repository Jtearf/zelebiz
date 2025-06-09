import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../config/queryClient';
import { useNetworkStatus } from '../../utils/networkUtils';
import { View } from 'react-native';

interface AppProvidersProps {
  children: React.ReactNode;
}

// Simple network status monitor component to avoid circular dependency issues
function NetworkMonitor() {
  useNetworkStatus();
  return null;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkMonitor />
      {children}
    </QueryClientProvider>
  );
}
