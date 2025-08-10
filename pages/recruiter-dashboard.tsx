import React from "react";
import Head from "next/head";
import { RecruiterDashboard } from "../components/RecruiterDashboard";

const RecruiterDashboardPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Recruiter Dashboard - TalentAI</title>
        <meta name="description" content="Find and connect with top AI talent" />
      </Head>
      <RecruiterDashboard />
    </>
  );
};

export default RecruiterDashboardPage;