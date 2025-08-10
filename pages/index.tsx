import React from "react";
import Head from "next/head";
import { LandingPage } from "../components/LandingPage";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>TalentAI - AI-Powered Talent Marketplace</title>
        <meta 
          name="description" 
          content="Connect with top AI talent through our intelligent matching platform. Break away from traditional HR with bias-free AI talent matching." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <LandingPage />
    </>
  );
};

export default Home;