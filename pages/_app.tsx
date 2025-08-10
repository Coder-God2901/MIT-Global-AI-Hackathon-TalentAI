import React from "react";
import type { AppProps } from "next/app";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { AppProvider, useApp } from "../context/AppContext";
import { ErrorNotification } from "../components/ErrorNotification";
import { LoadingOverlay } from "../components/LoadingSpinner";
import "../styles/globals.css";

// App content component that uses the context
const AppContent: React.FC<{ Component: any; pageProps: any }> = ({ Component, pageProps }) => {
  const { state, clearError } = useApp();

  return (
    <div className="min-h-screen bg-talentai-background">
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

// Main Next.js App component
const TalentAIApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const handleGlobalError = (error: any) => {
    console.error("[TalentAI] Unhandled error:", error);
    // In production, send to error tracking service
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