'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Import your Supabase client
import { useRouter } from 'next/navigation';

import { useUserContext } from '../Context/UserContext';

function GoogleSignIn() {
  const { user, setUser, setIsLoading } = useUserContext();
  const router = useRouter();

  // Handle Session and Auth State Changes
  useEffect(() => {
    const fetchSession = async () => {
      // Use the new method to fetch the session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsLoading(true);
        setUser(session.user); // Set the user if session exists
        router.push('/dashboard');
        setIsLoading(false);
      } else {
        setUser(null); // Set user to null if no session exists
      }
    };

    fetchSession(); // Call the session fetching function

    // Listen for changes in the authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setIsLoading(true);
          setUser(session.user); // Update the user state
          setIsLoading(false);
        } else {
          setUser(null); // Reset user state on logout
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };

    // return () => {
    //   // Unsubscribe from the auth state change listener properly
    //   authListener?.subscription?.unsubscribe();
    // };
  }, [setUser, setIsLoading]);

  // Handle logging user after it is set
}

export default GoogleSignIn;
