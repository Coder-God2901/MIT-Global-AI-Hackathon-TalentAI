import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase'; // Assuming you've created this file
import SignInFlow from '../components/SignInFlow';

const SignInPage: React.FC = () => {
  const router = useRouter();

  const handleSignIn = async (credentials: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      // Re-throw the error so the component can display it
      throw new Error(error.message);
    }

    // After successful sign-in, redirect to a dashboard
    // You can add logic here to check user type and redirect accordingly
    router.push('/candidate-dashboard'); 
  };

  return (
    <>
      <Head>
        <title>Sign In - TalentAI</title>
        <meta name="description" content="Sign in to your TalentAI account" />
      </Head>
      <SignInFlow onSignIn={handleSignIn} />
    </>
  );
};

export default SignInPage;