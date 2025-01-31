import { Context } from 'aws-lambda';
import PQueue from 'p-queue';
import { PQUEUE } from './config.js';
import random from './helpers/random.js';
import sleep from './helpers/sleep.js';
import logger from './services/logger.js';

export async function handler(event: any, context?: Context): Promise<any> {
  logger.start(context?.awsRequestId);
  logger.debug('Event received', { event });

  logger.info('p-queue settings', PQUEUE);

  const queue = new PQueue({ concurrency: PQUEUE.concurrency });

  for (let i = 0; i < PQUEUE.repeats; i++) {
    queue.add(async () => {
      logger.debug('Queueing', { i });

      const delay = random(100, 500);
      await sleep(delay);

      logger.debug('Finished', { i });
    });
  }

  await queue.onIdle();

  logger.finish();
}
