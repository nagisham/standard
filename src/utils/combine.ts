import { Lambda } from 'src';

export function combine(...functions: (Lambda<[], void> | undefined)[]) {
  return () => {
    functions.forEach((func) => func?.());
  };
}
