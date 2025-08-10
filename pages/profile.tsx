import React from "react";
import Head from "next/head";
import { ProfilePage } from "../components/ProfilePage";

const Profile: React.FC = () => {
  return (
    <>
      <Head>
        <title>Profile - TalentAI</title>
        <meta name="description" content="Manage your TalentAI profile and preferences" />
      </Head>
      <ProfilePage />
    </>
  );
};

export default Profile;