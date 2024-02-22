const { env } = process;

export const LOG = {
  level: env.LOG_LEVEL || 'info',
  lambdaVersion: env.AWS_LAMBDA_FUNCTION_VERSION || '1.0.0',
};
