// pages/candidate-dashboard.tsx
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router"; // Import the router
import CandidateDashboard from "../components/CandidateDashboard";

const CandidateDashboardPage: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <>
      <Head>
        <title>Candidate Dashboard - TalentAI</title>
        <meta name="description" content="Manage your AI talent profile and opportunities" />
      </Head>
      <CandidateDashboard onNavigate={handleNavigate} />
    </>
  );
};

export default CandidateDashboardPage;