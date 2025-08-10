import { useCallback, useMemo, useRef } from 'react';
import { debounce } from '../utils/helpers';

export const usePerformance = () => {
  // Memoized debounce function
  const createDebouncedCallback = useCallback(
    <T extends (...args: any[]) => any>(callback: T, delay: number) => {
      return debounce(callback, delay);
    },
    []
  );

  // Memoized stable reference for callbacks
  const useStableCallback = <T extends (...args: any[]) => any>(callback: T) => {
    const ref = useRef(callback);
    ref.current = callback;
    
    return useCallback((...args: Parameters<T>) => {
      return ref.current(...args);
    }, []) as T;
  };

  // Memoized deep comparison
  const useMemoizedValue = <T>(value: T, deps: any[]): T => {
    return useMemo(() => value, deps);
  };

  return {
    createDebouncedCallback,
    useStableCallback,
    useMemoizedValue
  };
};

// Custom hook for component performance monitoring
export const useComponentPerformance = (componentName: string) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(Date.now());

  renderCount.current += 1;
  const currentTime = Date.now();
  const renderTime = currentTime - lastRenderTime.current;
  lastRenderTime.current = currentTime;

  // In development, log performance metrics
  if (process.env.NODE_ENV === 'development') {
    if (renderCount.current % 10 === 0) {
      console.log(`[Performance] ${componentName}: ${renderCount.current} renders, last render took ${renderTime}ms`);
    }
  }

  return {
    renderCount: renderCount.current,
    renderTime
  };
};