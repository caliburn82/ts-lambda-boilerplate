import { toBool, toMs } from './formatters.js';

describe('toBool', () => {
  it('handles true values', () => {
    expect(toBool('true')).toBe(true);
    expect(toBool('1')).toBe(true);
    expect(toBool('yes')).toBe(true);
    expect(toBool('y')).toBe(true);
    expect(toBool('on')).toBe(true);
  });

  it('handles uppercase values', () => {
    expect(toBool('TRUE')).toBe(true);
    expect(toBool('YES')).toBe(true);
    expect(toBool('Y')).toBe(true);
    expect(toBool('ON')).toBe(true);
  });

  it('handles false values', () => {
    expect(toBool('false')).toBe(false);
    expect(toBool('0')).toBe(false);
    expect(toBool('no')).toBe(false);
    expect(toBool('n')).toBe(false);
    expect(toBool('off')).toBe(false);
    expect(toBool('')).toBe(false);
  });

  it('handles invalid values', () => {
    expect(toBool('invalid')).toBe(false);
  });
});

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
    expect(toMs('1s')).toBe(1000);
    expect(toMs('10s')).toBe(10000);
  });

  it('handles minutes', () => {
    expect(toMs('1m')).toBe(60000);
    expect(toMs('10m')).toBe(600000);
  });

  it('handles hours', () => {
    expect(toMs('1h')).toBe(3600000);
    expect(toMs('10h')).toBe(36000000);
  });

  it('handles days', () => {
    expect(toMs('1d')).toBe(86400000);
    expect(toMs('10d')).toBe(864000000);
  });

  it('handles weeks', () => {
    expect(toMs('1w')).toBe(604800000);
    expect(toMs('10w')).toBe(6048000000);
  });
})
