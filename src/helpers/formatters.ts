import { day, hour, minute, second, week } from './times.js';

export function toBool(value: string): boolean {
  return ['true', '1', 'yes', 'y', 'on'].includes((value).toLowerCase());
}

export function toMs(value: string): number {
  const match = value.match(/(\d+)([a-z])?/);
  if (!match) return 0;

  let total = Number(match[1]);
  const type = match[2]?.toLowerCase();

  if (type === 's') total *= second;
  if (type === 'm') total *= minute;
  if (type === 'h') total *= hour;
  if (type === 'd') total *= day;
  if (type === 'w') total *= week;

  return total;
}
