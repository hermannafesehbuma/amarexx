'use client';
import { FaGoogle } from 'react-icons/fa';

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Image from 'next/image';
import GoogleSignIn from './GoogleSignIn';
import ButtonBig from './ButtonBig';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle login/signup

  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true); // Set loading to true
      console.log('Signing in...');

      // Trigger Google OAuth login and await the result
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: 'https://amarexx.com/dashboard', // Redirect URL after successful login
      });

      // If there's an error, throw it
      if (error) {
        throw error;
      }

      // If no error, redirect to the dashboard
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
    } finally {
      setLoading(false); // Reset loading to false
      console.log('Sign-in complete');
    }
    GoogleSignIn();
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    let result;
    if (isLogin) {
      // Login
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    } else {
      // Signup
      result = await supabase.auth.signUp({
        email,
        password,
      });
    }

    const { data, error } = result;

    if (error) {
      setError(error.message);
    } else {
      setMessage(
        isLogin
          ? 'Login successful! Redirecting...'
          : 'Signup successful! Check your email for verification.'
      );
      if (isLogin) {
        window.location.href = '/dashboard'; // Redirect after login
      }
    }

    setLoading(false);
  };

  return (
    <div className="md:max-w-[50%] xs:max-w-[80%] mx-auto md:mt-[10%] xs:mt-[40%] border rounded-lg shadow-md grid md:grid-cols-2 xs:grid-cols-1">
      <div className="p-5 flex flex-col justify-center">
        <div className="flex justify-center">
          <Image
            src="/logo-amarex.png"
            height={100}
            width={100}
            alt="Amarex Logo"
          />
        </div>
        <h2 className="text-xl font-bold mb-4">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <p className="mb-4">
          {isLogin
            ? `Let's Continue from where we left off`
            : `Let's Start Tracking with Amarex Shipping`}
        </p>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-accent text-white px-7 py-2 rounded-full hover:bg-primary transition-all ease mb-4"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <ButtonBig
          className="px-7 py-2  rounded-full items-center text-base border-primary border flex justify-center  hover:text-white hover:bg-accent"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            'Signing In...'
          ) : (
            <>
              <FaGoogle className="text-primary " />

              <span className="text-primary  "> &nbsp; Google</span>
            </>
          )}
        </ButtonBig>
        <p
          className="mt-3 text-blue-600 cursor-pointer text-sm text-center hover:text-primary"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : 'Already have an account? Login'}
        </p>
        <Link href="/forgot-password">
          <p className="mt-3 text-blue-600 cursor-pointer text-sm text-center hover:text-primary">
            Forgot Password?
          </p>
        </Link>
        <div className="text-center mt-2 mb-10 ">
          <span> Need Help?</span>
          <Link href="/ContactUs">
            <span className="text-blue-600"> Customer Support</span>
          </Link>
        </div>
      </div>
      <div className="relative w-full md:h-full xs:h-[30%]">
        {' '}
        {/* Adjust container size */}
        <Image
          src="/amarex-login.jpg"
          alt="Login Image"
          layout="fill" // Makes the image fill its container
          objectFit="cover" // Ensures it covers the entire container
          className="rounded"
        />
      </div>
    </div>
  );
};

export default AuthForm;
