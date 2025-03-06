import { useMemo } from 'react';

export const useEnvironment = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isStandalone = process.env.REACT_APP_STANDALONE === 'true';
  const envFile = isDevelopment ? '.env.development' : '.env';

  const environmentInfo = useMemo(() => ({
    isDevelopment,
    isStandalone,
    envFile,
    showIndicator: isDevelopment
  }), [isDevelopment, isStandalone, envFile]);

  return environmentInfo;
}; 