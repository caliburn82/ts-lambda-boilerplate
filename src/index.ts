import { Context } from 'aws-lambda';
import logger from './services/logger.js';

export async function handler(event: any, context?: Context): Promise<any> {
  logger.start(context?.awsRequestId);
  logger.debug('Event received', { event });

  logger.finish();
}
