import { MapSet } from '../types/common.js';
import addToMapSet, { clearMapSet } from './addMapToSet.js';

describe('addMapToSet', () => {
  it('adds a map to a set', () => {
    const mapSet: MapSet<string> = new Map();

    addToMapSet(mapSet, 'key-1', 'value-1');
    addToMapSet(mapSet, 'key-1', 'value-2');

    addToMapSet(mapSet, 'key-2', 'value-2');
    addToMapSet(mapSet, 'key-2', 'value-3');

    expect(mapSet.size).toBe(2);
    expect(mapSet.get('key-1')).toEqual(new Set(['value-1', 'value-2']));
    expect(mapSet.get('key-2')).toEqual(new Set(['value-2', 'value-3']));
  });

  it('clears the set', () => {
    const mapSet: MapSet<string> = new Map();

    addToMapSet(mapSet, 'key-1', 'value-1');
    addToMapSet(mapSet, 'key-2', 'value-2');

    const set1 = mapSet.get('key-1')!;
    const set2 = mapSet.get('key-2')!;

    clearMapSet(mapSet);
    expect(mapSet.size).toBe(0);

    expect(set1.size).toBe(0);
    expect(set2.size).toBe(0);
  });
});
