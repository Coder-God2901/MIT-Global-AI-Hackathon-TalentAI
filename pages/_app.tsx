import React from "react";
import type { AppProps } from "next/app";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AppProvider, useApp } from "../context/AppContext";
import { ErrorNotification } from "../components/ErrorNotification";
import { LoadingOverlay } from "../components/LoadingSpinner";
import "../styles/globals.css";
import { Inter } from "next/font/google";

// Load Inter font via Next.js font system
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const AppContent: React.FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const { state, clearError } = useApp();

  return (
    <div className={`min-h-screen bg-talentai-background ${inter.className}`}>
      <Component {...pageProps} />

      {/* Global loading overlay */}
      {state.isLoading && <LoadingOverlay />}

      {/* Global error notification */}
      <ErrorNotification
        error={state.error}
        onDismiss={clearError}
        autoClose={true}
        duration={5000}
      />
    </div>
  );
};

const TalentAIApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const handleGlobalError = (error: any) => {
    console.error("[TalentAI] Unhandled error:", error);
    // send to monitoring in production if needed
  };

  return (
    <ErrorBoundary onError={handleGlobalError}>
      <AppProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default TalentAIApp;
