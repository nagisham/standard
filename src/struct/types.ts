import { Lambda } from 'src/Functions';

import { Expand } from 'src/types/globals';

export type Struct<C extends Lambda, E extends Lambda> = Expand<
  (...args: [...Parameters<E>, ...Parameters<C>]) => ReturnType<E> & ReturnType<C>
>;
