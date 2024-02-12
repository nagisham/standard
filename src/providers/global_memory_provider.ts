import { is_not_null, is_null } from "src/utils";

import { Provider } from "./types";

const state = new Map<string, any>();

export function global_memory_provider<VALUE>(key: string, initial?: VALUE): Provider<VALUE> {
	if (is_not_null(initial)) state.set(key, initial);

	return {
		get: () => state.get(key),
		set: (value: VALUE) => state.set(key, value),
		delete: () => {
			state.delete(key);
			return is_null(state.get(key));
		},
	};
}
