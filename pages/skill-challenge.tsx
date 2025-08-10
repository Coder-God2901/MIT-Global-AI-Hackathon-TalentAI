import React from "react";
import Head from "next/head";
import { SkillChallengePage } from "../components/SkillChallengePage";

const SkillChallenge: React.FC = () => {
  return (
    <>
      <Head>
        <title>Skill Challenge - TalentAI</title>
        <meta name="description" content="Showcase your AI skills with interactive challenges" />
      </Head>
      <SkillChallengePage />
    </>
  );
};

export default SkillChallenge;