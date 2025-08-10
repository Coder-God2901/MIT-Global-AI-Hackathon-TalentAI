import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ProfilePage from "../components/ProfilePage";

const Profile: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    // This function can be used to navigate to different sections of the profile or app
    router.push(`/${route}`);
  };

  const handleNavigateToUploader = () => {
    // Navigates to the resume upload page
    router.push('/upload-resume');
  };

  return (
    <>
      <Head>
        <title>Profile - TalentAI</title>
        <meta name="description" content="Manage your TalentAI profile and preferences" />
      </Head>
      <ProfilePage onNavigate={handleNavigate} onNavigateToUploader={handleNavigateToUploader} />
    </>
  );
};

export default Profile;