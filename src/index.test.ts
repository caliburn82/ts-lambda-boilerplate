import { jest } from '@jest/globals';
import { PQUEUE } from './config.js';
import random from './helpers/random.js';
import { second } from './helpers/toMs.js';
import { handler } from './index.js';
import * as r from './helpers/random.js';
import logger from './services/logger.js';

console.log(r);
jest.spyOn(r, 'default').mockReturnValue(100);

console.log(random(100, 500));

jest.setTimeout(second * 30);

logger.silent = true;

it('works', async () => {
  logger.silent = false;

  PQUEUE.repeats = 5;
  PQUEUE.concurrency = 2;

  await handler({ test: 'event' });
});
