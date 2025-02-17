'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import NavBar from '../Components/NavBar';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ShipmentLayout({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUserRole() {
      // Get authenticated user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push('/admin'); // Redirect if not logged in
        return;
      }

      // Fetch user role from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id) // Make sure you match the correct user_id
        .single();

      if (error || data?.role !== 'admin') {
        router.push('/dashboard'); // Redirect if not an admin
      } else {
        setIsAuthorized(true); // Set authorization state to true if admin
      }
    }

    checkUserRole();
  }, [router]);

  if (isAuthorized === null) return <p>Loading...</p>; // Show loading while checking

  return (
    <div className="grid md:grid-cols-4 xs:grid-cols-1 mt-[6.6%]">
      <NavBar className="col-span-1" />
      <main className="px-[5%] py-10 col-span-3 bg-gray-100">{children}</main>
      <p>© 2024 Your Company</p>
    </div>
  );
}
