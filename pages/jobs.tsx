import React from "react";
import Head from "next/head";
import { JobSearchPage } from "../components/JobSearchPage";

const JobsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>AI Jobs - TalentAI</title>
        <meta name="description" content="Discover AI job opportunities matched to your skills" />
      </Head>
      <JobSearchPage />
    </>
  );
};

export default JobsPage;