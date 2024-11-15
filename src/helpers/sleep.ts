import logger from '../services/logger.js';

export default function sleep(ms: number) {
  logger.error('sleep', ms);
  return sleepMe(ms);
}

export function sleepMe(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
