import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { LandingPage } from "../components/LandingPage";

const Home: React.FC = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    switch (route) {
      case "signup":
        router.push("/signup");
        break;
      case "job-search":
        router.push("/jobs");
        break;
      case "candidate-dashboard":
        router.push("/candidate-dashboard");
        break;
      case "recruiter-dashboard":
        router.push("/recruiter-dashboard");
        break;
      case "skill-challenge":
        router.push("/skill-challenge");
        break;
      case "interview-experience":
        router.push("/interview");
        break;
      case "profile":
        router.push("/profile");
        break;
      // Company section (static pages, if implemented)
      case "about":
        router.push("/about");
        break;
      case "blog":
        router.push("/blog");
        break;
      case "careers":
        router.push("/careers");
        break;
      // Support section (static pages, if implemented)
      case "help-center":
        router.push("/help-center");
        break;
      case "contact":
        router.push("/contact");
        break;
      case "privacy":
        router.push("/privacy");
        break;
      default:
        router.push("/");
        break;
    }
  };

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
      <LandingPage onNavigate={handleNavigate} />
    </>
  );
};

export default Home;