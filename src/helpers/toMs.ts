export const second = 1000;
export const minute = 60 * second;
export const hour = 60 * minute;
export const day = 24 * hour;
export const week = 7 * day;

export default function toMs(value: string): number {
  const match = value.match(/([0-9.]+)([a-z])?/);
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
