import { createLogger, Logger, transports } from 'winston';
import * as Transport from 'winston-transport';
import { LOG } from '../config.js';
import formats from './logger/formats.js';

const enabledTransports: Transport[] = [
  new transports.Console({ format: formats[LOG.format] ?? formats.json }),
];

if (LOG.driver === 'datadog') {
  enabledTransports.push(new transports.Http({
    host: 'http-intake.logs.datadoghq.com',
    path: `/api/v2/logs?dd-api-key=${LOG.apiKey}&ddsource=nodejs&hostname=${LOG.hostName}&service=${LOG.serviceName}&ddtags=env:${LOG.env},team:php`,
    ssl: true,
    format: formats.json,
  }));
}

type ExtendedLogger = Logger & { start: (id?: string) => void; finish: () => void; };

const logger = createLogger({
  level: LOG.level,
  exitOnError: false,
  transports: enabledTransports,
  exceptionHandlers: enabledTransports,
}) as ExtendedLogger;

let requestId: string | undefined;

logger.start = (id?: string) => {
  logger.defaultMeta = { trace: { cId: Date.now() % 1000 } };

  requestId = id;
  if (!requestId) return;

  logger.defaultMeta.trace.requestId = requestId;
  if (LOG.driver === 'datadog') logger.info(`START RequestId: ${requestId}`);
};

logger.finish = () => {
  if (requestId && LOG.driver === 'datadog') logger.info(`END RequestId: ${requestId}`);
};

export default logger;
