import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { AppState, ViewType, UserType, User, AppError } from '../types';
import { 
  updateDocumentTitle, 
  getDefaultDashboard, 
  validateNavigation, 
  createUser, 
  createAppError,
  logError 
} from '../utils/helpers';

// Action types
type AppAction =
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SIGNUP_SUCCESS'; payload: { user: User; redirectTo: ViewType } }
  | { type: 'SIGNIN_SUCCESS'; payload: { user: User; redirectTo: ViewType } }
  | { type: 'SIGN_OUT' }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: AppState = {
  currentView: 'landing',
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload,
        error: null
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        error: null
      };

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        currentView: action.payload.redirectTo,
        isLoading: false,
        error: null
      };

    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        currentView: action.payload.redirectTo,
        error: null
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'SIGN_OUT':
      return {
        ...initialState,
        currentView: 'landing'
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
};

// Context interface
interface AppContextType {
  state: AppState;
  navigate: (view: ViewType) => void;
  signUp: (userType: UserType, userData: { email: string; name: string }) => Promise<void>;
  signIn: (userData: User) => void;
  signOut: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Navigation handler with validation
  const navigate = useCallback((view: ViewType) => {
    try {
      const validation = validateNavigation(view, state.user);
      
      if (!validation.canNavigate) {
        const error = createAppError('NAVIGATION_ERROR', validation.error || 'Navigation not allowed');
        logError(error, 'AppContext.navigate');
        dispatch({ type: 'SET_ERROR', payload: validation.error || 'Navigation not allowed' });
        return;
      }

      dispatch({ type: 'SET_VIEW', payload: view });
      updateDocumentTitle(view);
    } catch (error) {
      const appError = createAppError('NAVIGATION_ERROR', 'Failed to navigate');
      logError(appError, 'AppContext.navigate');
      dispatch({ type: 'SET_ERROR', payload: 'Failed to navigate' });
    }
  }, [state.user]);

  // Sign up handler
  const signUp = useCallback(async (userType: UserType, userData: { email: string; name: string }): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        const newUser = createUser(userType, userData.email, userData.name);
        const defaultDashboard = getDefaultDashboard(userType);
        
        // Simulate async signup process
        setTimeout(() => {
          try {
            dispatch({ 
              type: 'SIGNUP_SUCCESS', 
              payload: { 
                user: newUser, 
                redirectTo: defaultDashboard 
              } 
            });
            resolve();
          } catch (error) {
            const appError = createAppError('SIGNUP_ERROR', 'Failed to create account');
            logError(appError, 'AppContext.signUp.setTimeout');
            dispatch({ type: 'SET_ERROR', payload: 'Failed to create account' });
            reject(error);
          }
        }, 1000);
        
      } catch (error) {
        const appError = createAppError('SIGNUP_ERROR', 'Failed to create account');
        logError(appError, 'AppContext.signUp');
        dispatch({ type: 'SET_ERROR', payload: 'Failed to create account' });
        reject(error);
      }
    });
  }, []);

  // Sign in handler
  const signIn = useCallback((userData: User) => {
    try {
      const defaultDashboard = getDefaultDashboard(userData.type);
      dispatch({ 
        type: 'SIGNIN_SUCCESS', 
        payload: { 
          user: userData, 
          redirectTo: defaultDashboard 
        } 
      });
    } catch (error) {
      const appError = createAppError('SIGNIN_ERROR', 'Failed to sign in');
      logError(appError, 'AppContext.signIn');
      dispatch({ type: 'SET_ERROR', payload: 'Failed to sign in' });
    }
  }, []);

  // Sign out handler
  const signOut = useCallback(() => {
    try {
      dispatch({ type: 'SIGN_OUT' });
      updateDocumentTitle('landing');
    } catch (error) {
      const appError = createAppError('SIGNOUT_ERROR', 'Failed to sign out');
      logError(appError, 'AppContext.signOut');
      dispatch({ type: 'SET_ERROR', payload: 'Failed to sign out' });
    }
  }, []);

  // Utility functions
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  // Update document title when view changes
  useEffect(() => {
    updateDocumentTitle(state.currentView);
  }, [state.currentView]);

  // Auto-clear errors after 5 seconds
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.error, clearError]);

  const contextValue: AppContextType = {
    state,
    navigate,
    signUp,
    signIn,
    signOut,
    setLoading,
    setError,
    clearError
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};