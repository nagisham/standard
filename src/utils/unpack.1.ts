import { Lambda } from 'src';

import { is_function } from './is';

export function unpack<V, A extends any[]>(value: V | Lambda<A, V>, ...args: A) {
  return is_function(value) ? value(...args) : value;
}
