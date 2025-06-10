import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Use your Supabase credentials
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-placeholder-for-development';

/**
 * In-memory storage adapter with localStorage fallback for web
 * This is a pure JavaScript implementation with no native dependencies
 */
class InMemoryStorageAdapter {
  // Memory cache for all platforms
  private memoryStore: Record<string, string> = {};
  
  // Flag for localStorage availability (web only)
  private hasLocalStorage = typeof localStorage !== 'undefined';

  constructor() {
    // Load any existing items from localStorage if available (web only)
    if (this.hasLocalStorage) {
      try {
        // Look for existing Supabase auth data in localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('sb-')) {
            this.memoryStore[key] = localStorage.getItem(key) || '';
          }
        });
        console.log('[Storage] Loaded existing items from localStorage');
      } catch (e) {
        console.warn('[Storage] Error loading from localStorage:', e);
      }
    }
  }

  async getItem(key: string): Promise<string | null> {
    // First check memory store
    if (this.memoryStore[key] !== undefined) {
      console.log(`[Storage] Read from memory: ${key} = found`);
      return this.memoryStore[key];
    }
    
    // Then check localStorage if available (web only)
    if (this.hasLocalStorage) {
      try {
        const value = localStorage.getItem(key);
        console.log(`[Storage] Read from localStorage: ${key} = ${value ? 'found' : 'not found'}`);
        
        if (value !== null) {
          // Cache in memory
          this.memoryStore[key] = value;
          return value;
        }
      } catch (e) {
        console.warn('[Storage] localStorage read error:', e);
      }
    }
    
    return null;
  }
  
  async setItem(key: string, value: string): Promise<void> {
    // Always update memory store
    this.memoryStore[key] = value;
    console.log(`[Storage] Stored in memory: ${key}`);
    
    // Also try to store in localStorage if available (web only)
    if (this.hasLocalStorage) {
      try {
        localStorage.setItem(key, value);
        console.log(`[Storage] Stored in localStorage: ${key}`);
      } catch (e) {
        console.warn('[Storage] localStorage write error:', e);
      }
    }
  }
  
  async removeItem(key: string): Promise<void> {
    // Remove from memory store
    delete this.memoryStore[key];
    console.log(`[Storage] Removed from memory: ${key}`);
    
    // Also try to remove from localStorage if available (web only)
    if (this.hasLocalStorage) {
      try {
        localStorage.removeItem(key);
        console.log(`[Storage] Removed from localStorage: ${key}`);
      } catch (e) {
        console.warn('[Storage] localStorage remove error:', e);
      }
    }
  }
}

// Create our in-memory storage adapter
const storageAdapter = new InMemoryStorageAdapter();

// Initialize the Supabase client with our storage adapter
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Export the storage adapter for direct usage if needed elsewhere
export { storageAdapter };
