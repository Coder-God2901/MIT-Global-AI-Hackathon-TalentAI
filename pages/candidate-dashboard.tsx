import React from "react";
import Head from "next/head";
import CandidateDashboard from "../components/CandidateDashboard";

const CandidateDashboardPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Candidate Dashboard - TalentAI</title>
        <meta name="description" content="Manage your AI talent profile and opportunities" />
      </Head>
      <CandidateDashboard onNavigate={() => {}} />
    </>
  );
};

export default CandidateDashboardPage;