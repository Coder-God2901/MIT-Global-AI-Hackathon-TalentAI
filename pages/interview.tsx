import React from "react";
import Head from "next/head";
import { InterviewExperience } from "../components/InterviewExperience";

const InterviewPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Interview Experience - TalentAI</title>
        <meta name="description" content="AI-powered interview experience for talent assessment" />
      </Head>
      <InterviewExperience />
    </>
  );
};

export default InterviewPage;