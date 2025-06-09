import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../config/supabase';
import { Session, User } from '@supabase/supabase-js';

// Custom hook for handling authentication with Supabase
export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Listen for auth changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoaded(true);
    });

    // Set up a listener for future auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
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
