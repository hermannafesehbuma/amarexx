'use client';

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '../supabaseClient';

export default function Page() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the API call to send the reset password email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}`, // Optional: set redirect URL
    });

    if (error) {
      setError(error.message); // Display error message
      setMessage(''); // Clear any success messages
    } else {
      setMessage('Check your email for the password reset link!'); // Display success message
      setError(''); // Clear any previous error messages
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded md:mt-[10%] xs:mt-[40%]">
      <div className="flex justify-center">
        <Image
          src="/logo-amarex.png"
          height={100}
          width={100}
          alt="Amarex Logo"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 mb-4"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          type="submit"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
