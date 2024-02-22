import util from 'util';
import { createLogger, format, Logger, transports } from 'winston';
import * as Transport from 'winston-transport';
import { LOG } from '../config.js';

const formatArgs = (arg: unknown): string => (
  util.format(typeof arg === 'string' ? arg : util.inspect(arg, {
    showHidden: false, depth: null, colors: true, compact: true,
  }))
);

const enabledTransports: Transport[] = [
  new transports.Console({
    format: format.combine(
      format.ms(),
      format.colorize(),
      format.align(),
      format.errors({ stack: true }),
      format.printf((info) => {
        const splat = Symbol.for('splat');
        const suffix = info[splat] ? `: ${formatArgs(info[splat][0])}` : '';

        return `${info.level}: ${info.ms}: ${info.message}${suffix}`;
      }),
    ),
  }),
];

interface LoggerWithStart extends Logger {
  start: (id?: string) => void;
  finish: () => void;
}

const logger = createLogger({
  level: LOG.level,
  exitOnError: false,
  transports: enabledTransports,
  exceptionHandlers: enabledTransports,
}) as LoggerWithStart;

let requestId: string | undefined;

// @ts-ignore
logger.start = (id?: string): void => {
  requestId = id;
  if (requestId) {
    logger.defaultMeta = { cid: requestId.split('-').pop()! };
    logger.info(`START RequestId: ${requestId} Version: ${LOG.lambdaVersion}`);
  }
}

logger.finish = () => {
  if (requestId) logger.info(`END RequestId: ${requestId}`);
};

export default logger;


