import { is_not_null, is_null } from "src/utils";

import { Provider } from "./types";

export function in_memory_provider<VALUE>(): Provider<VALUE | undefined>;
export function in_memory_provider<VALUE>(initial: VALUE): Provider<VALUE>;
export function in_memory_provider<VALUE>(initial?: VALUE) {
	const state: { current?: VALUE | undefined } = {};

	if (is_not_null(initial)) state.current = initial;

	return {
		get: () => state.current,
		set: (value: VALUE) => {
			state.current = value;
		},
		delete: () => {
			delete state.current;
			return is_null(state.current);
		},
	};
}
