const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

export const AppConfig = {
  API_URL: import.meta.env.VITE_API_URL ?? '',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,

  ENABLE_MOCK: isDev && import.meta.env.VITE_ENABLE_MOCK === 'true',

  MODE: import.meta.env.MODE,
  IS_DEV: isDev,
  IS_PROD: isProd,
};
