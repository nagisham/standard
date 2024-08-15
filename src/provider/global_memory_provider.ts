import { $remove, $get, $set, Provider } from "./provider";

const state = new Map();

export function global_memory_provider<S>(): Provider<S> {
	return {
		[$get]: (key) => state.get(key),
		[$set]: (key, value) => {
			state.set(key, value);
		},
		[$remove]: (key) => state.delete(key),
	};
}
