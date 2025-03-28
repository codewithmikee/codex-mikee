// Configuration exports
export const APP_VERSION = '1.0.0';

// Environment helpers
export const isDevelopment = process.env.NODE_ENV !== 'production';
export const isProduction = process.env.NODE_ENV === 'production';

// Default ports and hosts
export const DEFAULT_PORT = 5000;
export const DEFAULT_HOST = '0.0.0.0';