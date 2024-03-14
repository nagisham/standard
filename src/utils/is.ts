import { Lambda } from "src";

export function is_null<T>(value: T | null | undefined): value is null | undefined {
	return typeof value === "undefined" || value === null;
}

export function is_not_null<T>(value: T | null | undefined): value is T {
	return typeof value !== "undefined" && value !== null;
}

export function is_boolean<A>(value: A | boolean): value is boolean {
	return typeof value === "boolean";
}

export function is_number<A>(value: A | number): value is number {
	return typeof value === "number";
}

export function is_string<A>(value: A | string): value is string {
	return typeof value === "string";
}

export function is_empty_string<A>(value: A | string): value is "" {
	return is_string(value) && value === "";
}

export function is_not_empty_string(value: string): value is string {
	return !is_empty_string(value);
}

export function is_object<A>(value: A | object): value is object {
	return typeof value === "object";
}

export function is_array<A, T>(value: A | T[]): value is T[];
export function is_array<A, T>(value: A | T[], length: 0): value is [];
export function is_array<A, T>(value: A | T[], length: 1): value is [T];
export function is_array<A, T>(value: A | T[], length: number): value is T[];
export function is_array<T>(value: unknown | T[], length?: number): value is T[];
export function is_array<A, T>(value: A | T[], length?: number): value is T[] {
	if (length) {
		return value instanceof Array && value.length === length;
	}

	return value instanceof Array;
}

export function is_function<A, F extends Lambda>(value: A | F): value is F {
	return typeof value === "function";
}
