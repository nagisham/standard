import { is_function } from "src/is";
import { Arguments, Compose, Merge } from "./types";
import { in_memory_provider, Provider } from "src/provider";

export type Lambda<A extends any[] = any[], R = any> = (...args: A) => R;

export namespace Lambda {
	export function call<R>(lambda?: Lambda<[], R>) {
		return lambda?.();
	}

	export function toggle(boolean: boolean) {
		return !boolean;
	}

	export function combine(...functions: Array<Lambda<[], void> | undefined>) {
		return () => {
			functions.forEach(call);
		};
	}
	
	export const compose: Compose = <A>(...lambdas: Lambda<[A], A>[]) => {
		return (arg: A) => lambdas.reduce((arg, lambda) => lambda(arg), arg);
	};

	export const merge: Merge = <A>(...lambdas: Lambda<[A], A>[]) => {
		return (args: A) => lambdas.reduce((result, behavior) => Object.assign(result, behavior(args)), {});
	};

	export function unpack<VALUE, ARGS extends any[]>(
		value: VALUE | Lambda<ARGS, VALUE>,
		...args: ARGS
	) {
		return is_function(value) ? value(...args) : value;
	}

	export function cache<F extends Lambda>(fn: F) {
		const cache = in_memory_provider<{ [key: string]: unknown }>();
		
		const cached = (args: Arguments<F>) => Provider.get_or_create(
			JSON.stringify(args),
			() => fn(...args),
			cache
		);
		
		return cached as F
	}
	
	export function flip<F extends Lambda>(fn: F) {
		return (m: Parameters<ReturnType<F>>[0]) => (...args: Parameters<F>): ReturnType<ReturnType<F>> => fn(...args)(m)
	}
}
