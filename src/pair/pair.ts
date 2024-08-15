const $first = Symbol();
type $first = typeof $first;

const $second = Symbol();
type $second = typeof $second;

export type Pair<A, B> = {
	[$first]: A;
	[$second]: B;
};

export namespace Pair {
	export function create<A, B>(first: A, second: B): Pair<A, B> {
		return { [$first]: first, [$second]: second };
	}

	export function first<A, B>(pair: Pair<A, B>) {
		return pair[$first];
	}
	
	export function second<A, B>(pair: Pair<A, B>) {
		return pair[$second];
	}
}
