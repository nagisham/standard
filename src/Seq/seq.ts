export namespace Seq {
  export function iterator<T>(array: ArrayLike<T>, index: number = 0, length?: number) {
    return function* () {
      length ??= array.length;

      while (index <= length) {
        yield array[index];
        index++;
      }
    };
  }

  export function iterable<T>(
    array: ArrayLike<T>,
    index?: number,
    length?: number,
  ): Iterable<T | undefined> {
    return { [Symbol.iterator]: iterator(array, index, length) };
  }

  export function slice<T>(start: number, end?: number) {
    return (array: ArrayLike<T>) => iterable(array, start, end);
  }
}
