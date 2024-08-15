import { is_undefined, is_null } from "src/is";

import { in_memory_provider } from "./in_memory_provider";
import { $remove, $get, $set, Provider } from "./provider";

function storage_provider<S>(storage: Storage) : Provider<S> {
	return {
		[$get]: (key) => {
				let value = storage.getItem(key.toString());
	
				if (is_null(value)) return undefined;
	
				try {
					value = JSON.parse(value);
				} finally {
					return value as S[typeof key];
				}
		},
		[$set]: (key, value) => {
			storage.setItem(key.toString(), JSON.stringify(value));
		},
		[$remove]: (key) => {
			storage.removeItem(key.toString());
			return is_null(storage.getItem(key.toString()));
		},
	};
}

export function local_storage_provider<S>() {
	return is_undefined(localStorage) ? in_memory_provider<S>() : storage_provider<S>(localStorage);
}

export function session_storage_provider<S>() {
	return is_undefined(sessionStorage) ? in_memory_provider<S>() : storage_provider<S>(sessionStorage);
}
