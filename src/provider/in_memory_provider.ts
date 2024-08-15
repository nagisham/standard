import { $remove, $get, $set, Provider } from "./provider";

export function in_memory_provider<S>(): Provider<S> {
	const state = <S>{};

	return {
		[$get]: (key) => state[key],
		[$set]: (key, value) => {
			state[key] = value;
		},
		[$remove]: (key) => delete state[key],
	};
}
