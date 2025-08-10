import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppProvider, useApp } from "./context/AppContext";
import { AppRouter } from "./components/AppRouter";
import { ErrorNotification } from "./components/ErrorNotification";
import { LoadingOverlay } from "./components/LoadingSpinner";

// Main app content component
const AppContent: React.FC = () => {
  const { state, clearError } = useApp();

  return (
    <div className="min-h-screen bg-talentai-background">
      <AppRouter />

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

// Root app component with providers and error boundary
const App: React.FC = () => {
  const handleGlobalError = (error: any) => {
    console.error("[TalentAI] Unhandled error:", error);
    // In production, send to error tracking service
  };

  return (
    <ErrorBoundary onError={handleGlobalError}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;