import { Lambda } from "./types";

export namespace Functions {
	export function call(lambda: Lambda<[], void> | undefined): void;
	export function call<R>(lambda: Lambda<[], R>): R;
	export function call<R>(lambda: Lambda<[], R> | undefined) {
		return lambda?.();
	}

	export function toggle(boolean: boolean) {
		return !boolean;
	}
}
