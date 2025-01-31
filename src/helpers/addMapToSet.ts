import { MapSet } from '../types/common.js';

export default function addToMapSet<T>(mapSet: MapSet<T>, key: string, value: T) {
  let valueSet = mapSet.get(key);
  if (!valueSet) {
    valueSet = new Set<T>();
    mapSet.set(key, valueSet);
  }

  valueSet.add(value);
}

export function clearMapSet<T>(mapSet: MapSet<T>) {
  mapSet.forEach((valueSet: Set<T>) => valueSet.clear());
  mapSet.clear();
}
