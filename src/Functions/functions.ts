import { Lambda } from "./types";

export namespace Functions {
	export function call<R>(lambda: Lambda<[], R>) {
		return lambda();
	}

	export function togle(boolean: boolean) {
		return !boolean;
	}
}
