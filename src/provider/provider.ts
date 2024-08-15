import { is_undefined } from "src/is";
import { Lazy } from "src/lazy";
import { Task } from "src/task";

export type keys = string | number | symbol;


export const $get = Symbol();
export type $get = typeof $get;

export const $set = Symbol();
export type $set = typeof $set;

export const $remove = Symbol();
export type $remove = typeof $remove;

export interface Provider<S> {
	[$get]: <K extends keyof S>(key: K) => Task<S[K] | undefined>;
	[$set]: <K extends keyof S>(key: K, value: S[K]) => Task<void>;
	[$remove]: <K extends keyof S>(key: K) => Task<boolean>;
}

export namespace Provider {
	export function get<K extends keyof S, S>(key: K, provider: Provider<S>): Task<S[K] | undefined> {
		return provider[$get](key);
	}

	export function set<K extends keyof S, S>(key: K, value: S[K], provider: Provider<S>): Task<void> {
		provider[$set](key, value);
	}

	export function remove<K extends keyof S, S>(key: K, provider: Provider<S>): Task<boolean> {
		return provider[$remove](key);
	}

	export function get_or_create<S, K extends keyof S>(key: K, lazy: Lazy<S[K]>, provider: Provider<S>) {
		return Task.then(async (value) => {
			if (is_undefined(value)) {
				value = Lazy.get(lazy);
				await Provider.set(key, value, provider);
			}

			return value;
		}, Provider.get(key, provider));
	}
}
