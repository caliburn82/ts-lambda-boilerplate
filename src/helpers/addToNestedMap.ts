import { NestedMap } from '../types/common.js';

export default function addToNestedMap<T>(map: NestedMap<T>, key1: string, key2: string, value: T) {
  let internalMap = map.get(key1);
  if (!internalMap) {
    internalMap = new Map();
    map.set(key1, internalMap);
  }

  internalMap.set(key2, value);
}

export function findOrCreateFromNestedMap<T>(map: NestedMap<T>, key1: string, key2: string, defaultValue: T) {
  let internalMap = map.get(key1);
  if (!internalMap) {
    internalMap = new Map();
    map.set(key1, internalMap);
  }

  let value = internalMap.get(key2);
  if (!value) {
    internalMap.set(key2, defaultValue);
    value = defaultValue;
  }

  return value;
}
