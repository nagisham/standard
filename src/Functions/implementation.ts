import { Lambda } from './types';

export namespace Functions {
  export function call(lambda: Lambda<[], void>) {
    return lambda();
  }

  export function togle(boolean: boolean) {
    return !boolean;
  }
}
