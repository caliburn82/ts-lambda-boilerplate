import { day, hour, minute, second, week } from './times.js';

export function toBool(value: string): boolean {
  return ['true', '1', 'yes', 'y', 'on'].includes((value).toLowerCase());
}

export function toMs(value: string): number {
  const match = value.match(/(\d+)([a-z])?/);
  if (!match) return 0;

  const total = Number(match[1]);
  const type = match[2].toLowerCase();

  if (type === 's') return total * second;
  if (type === 'm') return total * minute;
  if (type === 'h') return total * hour;
  if (type === 'd') return total * day;
  if (type === 'w') return total * week;

  return total;
}
