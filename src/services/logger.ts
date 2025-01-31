import { Format } from 'logform';
import util from 'util';
import { createLogger, format, Logger, transports } from 'winston';
import * as Transport from 'winston-transport';
import { LOG } from '../config.js';
const formatArgs = (arg: unknown): string => (
  util.format(typeof arg === 'string' ? arg : util.inspect(arg, {
    showHidden: false,
    depth: null,
    colors: true,
    compact: false,
  }))
);

const loggerFormats: Record<string, Format> = {
  json: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),

  pretty: format.combine(
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
};

const enabledTransports: Transport[] = [
  new transports.Console({ format: loggerFormats[LOG.format] ?? loggerFormats.json }),
];

if (LOG.driver === 'datadog') {
  enabledTransports.push(new transports.Http({
    host: 'http-intake.logs.datadoghq.com',
    path: `/api/v2/logs?dd-api-key=${LOG.apiKey}&ddsource=nodejs&hostname=${LOG.hostName}&service=${LOG.serviceName}&ddtags=env:${LOG.env},team:php`,
    ssl: true,
    format: loggerFormats.json,
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
