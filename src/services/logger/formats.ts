import { Format } from 'logform';
import util from 'util';
import { format } from 'winston';

const formatArgs = (arg: unknown): string => (
  util.format(typeof arg === 'string' ? arg : util.inspect(arg, {
    showHidden: false,
    depth: null,
    colors: true,
    compact: false,
  }))
);

const formats: Record<string, Format> = {
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

export default formats;
