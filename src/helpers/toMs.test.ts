import toMs, { day, hour, minute, second, week } from './toMs.js';

describe('toMs', () => {
  it('handles empty strings', () => {
    expect(toMs('')).toBe(0);
  });

  it('handles invalid strings', () => {
    expect(toMs('invalid')).toBe(0);
  });

  it('handles set numbers', () => {
    expect(toMs('0')).toBe(0);
    expect(toMs('1')).toBe(1);
    expect(toMs('10')).toBe(10);
  });

  it('handles seconds', () => {
    expect(toMs('1s')).toBe(second);
    expect(toMs('5.5s')).toBe(second * 5.5);
    expect(toMs('10s')).toBe(second * 10);
  });

  it('handles minutes', () => {
    expect(toMs('1m')).toBe(minute);
    expect(toMs('10m')).toBe(minute * 10);
  });

  it('handles hours', () => {
    expect(toMs('1h')).toBe(hour);
    expect(toMs('10h')).toBe(hour * 10);
  });

  it('handles days', () => {
    expect(toMs('1d')).toBe(day);
    expect(toMs('10d')).toBe(day * 10);
  });

  it('handles weeks', () => {
    expect(toMs('1w')).toBe(week);
    expect(toMs('10w')).toBe(week * 10);
  });
});
