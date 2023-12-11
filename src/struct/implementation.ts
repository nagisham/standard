import { Lambda } from 'src/Functions';
import { Record } from 'src/Record';
import { Seq } from 'src/Seq';

import { Struct } from './types';

export function struct<C extends Lambda>(implementation: C): C;
export function struct<C extends Lambda, E extends Lambda>(
  implementation: C,
  extend?: E,
): Struct<C, E>;
export function struct<C extends Lambda, E extends Lambda>(implementation: C, extend?: E) {
  function Struct() {
    return Record.setConstructor(
      extend
        ? Object.assign(
            extend(...Seq.iterable(arguments, 0, extend.length)),
            implementation(...Seq.iterable(arguments, extend.length)),
          )
        : implementation(...arguments),
      Struct,
    );
  }

  Object.defineProperties(Struct, {
    name: {
      value: implementation.name,
      configurable: false,
      enumerable: false,
      writable: false,
    },
    length: {
      value: implementation.length,
      configurable: false,
      enumerable: false,
      writable: false,
    },
  });

  if (extend) {
    Object.setPrototypeOf(Struct, extend.prototype);
    Object.setPrototypeOf(Struct.prototype, extend.prototype);
  }

  return Struct;
}
