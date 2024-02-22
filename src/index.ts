import { Context } from 'aws-lambda';
import PQueue from 'p-queue';
import sleep from './helpers/sleep.js';
import logger from './services/logger.js';

export async function handler(event: any, context?: Context): Promise<any> {
  logger.start(context?.awsRequestId);
  logger.debug('Event received', { event });

  const queue = new PQueue({ concurrency: 2 });

  for (let i = 0; i < 10; i++) {
    queue.add(async () => {
      logger.debug('Queueing', { i });
      await sleep(100);
      logger.debug('Finished', { i });
    });
  }

  await queue.onIdle();

  logger.finish();
}
