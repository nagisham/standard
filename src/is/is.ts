import { Lambda } from "src";
import { Task } from "src/task";

type empty = null | undefined;

export function is_empty<T>(value: T | empty): value is empty {
	return is_undefined(value) || is_null(value);
}

export function is_not_empty<T>(value: T | empty): value is T {
	return is_not_undefined(value) && is_not_null(value);
}

export function is_null<T>(value: T | null): value is null {
	return value === null;
}

export function is_not_null<T>(value: T | null): value is T {
	return value !== null;
}

export function is_undefined<T>(value: T | undefined): value is undefined {
	return typeof value === "undefined";
}

export function is_not_undefined<T>(value: T | undefined): value is T {
	return typeof value !== "undefined";
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
	return value && typeof value === 'object' && !Array.isArray(value);
}

export function is_array<A, T>(value: A | T[]): value is T[];
export function is_array<A, T>(value: A | T[], length: 0): value is [];
export function is_array<A, T>(value: A | T[], length: 1): value is [T];
export function is_array<A, T>(value: A | T[], length: number): value is T[];
export function is_array<T>(value: unknown | T[], length?: number): value is T[];
export function is_array<A, T>(value: A | T[], length?: number): value is T[] {
	if (length) {
		return Array.isArray(value) && value.length === length;
	}

	return Array.isArray(value);
}

export function is_function<A, F extends Lambda>(value: A | F): value is F {
	return typeof value === "function";
}

export function is_promise<A>(value: Task<A>): value is Promise<A> {
	return value instanceof Promise;
}
