// pages/signup.tsx
import React from "react";
import Head from "next/head";
import SignupFlow from "../components/SignupFlow";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SignupPage: React.FC = () => {
  const router = useRouter();

  const handleSignup = async (userType: 'candidate' | 'recruiter', userData: any) => {
    try {
      // 1. Sign up the user with email and password
      const { data, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password, // IMPORTANT: You need to pass the password from your form
        options: {
          data: {
            // You can add additional data to the user object if needed
            full_name: `${userData.firstName} ${userData.lastName}`,
            user_type: userType,
          }
        }
      });

      if (authError) {
        throw authError;
      }

      // If signup is successful, we get the user data
      const user = data.user;

      if (user) {
        // 2. Save additional profile data to your 'candidates' or 'recruiter' table
        if (userType === 'candidate') {
          const { error: candidateError } = await supabase
            .from('candidates')
            .insert([
              {
                user_id: user.id,
                full_name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                // Add other candidate-specific data from your form
              },
            ]);

          if (candidateError) {
            throw candidateError;
          }
        } else { // Recruiter
          const { error: recruiterError } = await supabase
            .from('recruiters') // Assuming you have a recruiters table
            .insert([
              {
                user_id: user.id,
                full_name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                company: userData.company,
              },
            ]);

          if (recruiterError) {
            throw recruiterError;
          }
        }
      }

      // 3. Redirect the user to the appropriate dashboard
      if (userType === 'candidate') {
        router.push('/candidate-dashboard');
      } else {
        router.push('/recruiter-dashboard');
      }
      
    } catch (error: any) {
      console.error('Signup failed:', error.message);
      // You may want to set an error state here to show an error message to the user
      // For now, let's just log it.
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - TalentAI</title>
        <meta name="description" content="Join TalentAI and connect with top AI talent" />
      </Head>
      <SignupFlow
        onSignup={handleSignup}
        onNavigate={(route) => {
          // Re-use the Next.js router for navigation
          router.push(`/${route}`);
        }}
      />
    </>
  );
};

export default SignupPage;