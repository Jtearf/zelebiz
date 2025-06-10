import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { Session, User } from '@supabase/supabase-js';

// Custom hook for handling authentication with Supabase
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Listen for auth changes with better error handling and persistence
  useEffect(() => {
    let isMounted = true;
    console.log('[Auth] Initializing auth hook...');
    
    // Function to get and set the session
    const loadSession = async () => {
      try {
        console.log('[Auth] Loading session from Supabase...');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('[Auth] Error loading session:', error.message);
          if (isMounted) setIsLoaded(true);
          return;
        }
        
        if (data?.session) {
          console.log('[Auth] Session loaded successfully, user is signed in');
          if (isMounted) {
            setSession(data.session);
            setUser(data.session.user);
          }
        } else {
          console.log('[Auth] No active session found');
        }
        
        if (isMounted) setIsLoaded(true);
      } catch (err) {
        console.error('[Auth] Unexpected error loading session:', err);
        if (isMounted) setIsLoaded(true);
      }
    };
    
    // Load the session immediately
    loadSession();

    // Set up a listener for future auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`[Auth] Auth state changed: ${event}`);
        if (isMounted) {
          setSession(session);
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Sign in with email and password
  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      return { success: true, user: data.user };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Failed to sign in',
      };
    }
  }, []);

  // Sign up with email and password
  const register = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // Create a new user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            full_name: `${firstName} ${lastName}`
          }
        }
      });
      
      if (error) throw error;
      return { success: true, user: data.user };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Failed to sign up',
      };
    }
  }, []);

  // Sign out
  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Failed to sign out',
      };
    }
  }, []);

  // Check if user is signed in
  const isSignedIn = user !== null;

  return {
    user,
    isLoaded,
    isSignedIn,
    session,
    login,
    register,
    logout,
  };
};
