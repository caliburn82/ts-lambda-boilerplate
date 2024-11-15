const { env } = process;

export const LOG = {
  level: env.LOG_LEVEL || 'info',
  format: env.LOG_FORMAT || 'json',
  driver: env.LOG_DRIVER || 'console',
  apiKey: env.LOG_API_KEY,
  hostName: env.LOG_HOST_NAME ||'uat-tester',
  serviceName: env.LOG_SERVICE_NAME || 'tester',
  env: env.LOG_ENV || 'uat',
};

export const PQUEUE = {
  repeats: 100,
  concurrency: 5,
}
