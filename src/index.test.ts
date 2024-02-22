import { randomUUID } from 'node:crypto';
import { handler } from './index';
import logger from './services/logger';

logger.silent = true;

it('works', async () => {
  logger.silent = false;
  await handler(['test', { fu: 'bar' }], { awsRequestId: randomUUID() } as any);
});
