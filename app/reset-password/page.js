'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabaseClient';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Extract token from hash fragment (#access_token=...)
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    if (accessToken) {
      setToken(accessToken);
    } else {
      setError('Invalid or expired reset link.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Missing or invalid token');
      return;
    }

    // Update user password with the extracted token
    const { data, error } = await supabase.auth.updateUser(
      { password },
      { accessToken: token }
    );

    if (error) {
      setError(error.message);
      setSuccessMessage('');
    } else {
      setSuccessMessage('Your password has been reset successfully!');
      setTimeout(() => router.push('/auth'), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-[20%]">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      {error && <p className="text-red-600">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 mb-4"
        />
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
