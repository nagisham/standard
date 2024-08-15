// Lens but with Task integration ?

const $first = Symbol();
type $first = typeof $first;

const $second = Symbol();
type $second = typeof $second;

export interface Telescope<A, B> {
	[$first]: A;
	[$second]: B;
};

export namespace Telescope {
	export function create<A, B>(first: A, second: B): Telescope<A, B> {
		return { [$first]: first, [$second]: second };
	}

	export function first<A, B>(pair: Telescope<A, B>) {
		return pair[$first];
	}
	
	export function second<A, B>(pair: Telescope<A, B>) {
		return pair[$second];
	}
}
