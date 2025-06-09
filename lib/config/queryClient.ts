import { QueryClient } from '@tanstack/react-query';
import { useAppStore } from '../stores/appStore';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default staleTime to 5 minutes (300000ms)
      staleTime: 5 * 60 * 1000,
      
      // Retry failed queries 3 times
      retry: 3,
      
      // Enable offline support with longer garbage collection time
      gcTime: 24 * 60 * 60 * 1000, // 24 hours
      
      // Only refetch on window focus if online
      refetchOnWindowFocus: () => useAppStore.getState().isOnline,
      
      // Also condition network-based refetching on online status
      refetchOnReconnect: () => useAppStore.getState().isOnline,
    },
  },
});

// For convenience, export the hook
export { useQueryClient } from '@tanstack/react-query';
