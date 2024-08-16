// Lens but with Task integration ?

import { Pair } from "src/pair";
import { Task } from "src/task";

const $get = Symbol();
type $get = typeof $get;

const $set = Symbol();
type $set = typeof $set;

interface Error {
	code: string;
}

export interface Telescope<S, V> {
	[$get]: (source: S) => Task<Pair<Error, V>>;
	[$set]: (source: S, value: V) => S;
};

export namespace Telescope {
	// export function create<S, V>(first: A, second: B): Telescope<S, V> {
	// 	return { [$get]: first, [$set]: second };
	// }

	export function get<S, V>(pair: Telescope<S, V>) {
		return pair[$get];
	}
	
	export function set<S, V>(pair: Telescope<S, V>) {
		return pair[$set];
	}
}
