import { is_not_null, is_null } from "src/utils";

import { in_memory_provider } from "./in_memory_provider";
import { Provider } from "./types";

export function storage_provider<VALUE>(storage: Storage, key: string): Provider<VALUE | undefined>;
export function storage_provider<VALUE>(
	storage: Storage,
	key: string,
	initial: VALUE,
): Provider<VALUE>;
export function storage_provider<VALUE>(storage: Storage, key: string, initial?: VALUE) {
	if (is_not_null(initial)) storage.setItem(key, JSON.stringify(initial));

	return {
		get: () => {
			let value = storage.getItem(key);

			if (is_null(value)) return undefined;

			try {
				value = JSON.parse(value);
			} finally {
				return value as VALUE;
			}
		},
		set: (value: VALUE) => storage.setItem(key, JSON.stringify(value)),
		delete: () => {
			storage.removeItem(key);
			return is_null(storage.getItem(key));
		},
	};
}

export function local_storage_provider<VALUE>(key: string): Provider<VALUE | undefined>;
export function local_storage_provider<VALUE>(key: string, initial: VALUE): Provider<VALUE>;
export function local_storage_provider<VALUE>(key: string, initial?: VALUE) {
	return is_null(localStorage)
		? in_memory_provider(initial)
		: storage_provider(localStorage, key, initial);
}

export function session_storage_provider<VALUE>(key: string): Provider<VALUE | undefined>;
export function session_storage_provider<VALUE>(key: string, initial: VALUE): Provider<VALUE>;
export function session_storage_provider<VALUE>(key: string, initial?: VALUE) {
	return is_null(sessionStorage)
		? in_memory_provider(initial)
		: storage_provider(sessionStorage, key, initial);
}
