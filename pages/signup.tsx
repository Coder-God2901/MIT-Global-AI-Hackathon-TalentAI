import React from "react";
import Head from "next/head";
import SignupFlow from "../components/SignupFlow";

const SignupPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sign Up - TalentAI</title>
        <meta name="description" content="Join TalentAI and connect with top AI talent" />
      </Head>
      <SignupFlow
        onSignup={(userData) => {
          // handle signup logic here
          console.log("User signed up:", userData);
        }}
        onNavigate={(route) => {
          // handle navigation logic here
          console.log("Navigate to:", route);
        }}
      />
    </>
  );
};

export default SignupPage;