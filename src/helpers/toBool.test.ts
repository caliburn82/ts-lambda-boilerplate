import toBool from './toBool.js';

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
