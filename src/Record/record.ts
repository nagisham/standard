import { Lambda } from "src/lambda";

import { Assign, TypeOfMap } from "./types";
import { is_array, is_not_undefined, is_object } from "src/is";

export namespace Record {
	export function assign<T extends Record<string, any>>(target: T, source: T) : T;
	export function assign<T extends Record<string, any>, U extends Record<string, any>>(target: T, source: U) : Assign<T, U>;
	export function assign(target: Record<string, any>, source: Record<string, any>) {
		const fresh: Record<string, any> = {}
	
		for (const key of Record.keys(target, source)) {
			const left = target[key];
			const right = source[key];
		
			if (is_array(left) && is_array(right)) {
				fresh[key] = [...left, ...right];
				continue;
			}
	
			if (is_object(left) && is_object(right)) {
				fresh[key] = assign(left, right);
				continue;
			}

			if (is_not_undefined(left)) {
				fresh[key] = right;
			}

			if (is_not_undefined(right)) {
				fresh[key] = right;
			}
		}
	
		return fresh;
	}
	
	export function getConstructor(u: unknown): Lambda {
		return Object.getPrototypeOf(u).constructor;
	}

	export function setConstructor<R extends object, C extends Lambda>(
		record: R,
		constructor: C,
	): R & { __proto__: { constructor: C } } {
		return Object.setPrototypeOf(record, constructor.prototype);
	}

	export const keys = (...objects: object[]) => {
		const set = new Set<string>();

		for (const object of objects) {
			for (const key of Object.keys(object)) {
				set.add(key);
			}
		}

		return Array.from(set);
	};

	export function has<K extends keyof any>(
		object: unknown,
		key: K,
	): object is { [P in K]: unknown };
	export function has<K extends keyof any, C extends abstract new (...args: any) => any>(
		object: unknown,
		key: K,
		constructor: C,
	): object is { [P in K]: InstanceType<C> };
	export function has<K extends keyof any, T extends keyof TypeOfMap>(
		object: unknown,
		key: K,
		type: T,
	): object is { [P in K]: TypeOfMap[T] };
	export function has<
		K extends keyof any,
		C extends keyof TypeOfMap | (abstract new (...args: any) => any),
	>(object: unknown, key: K, type?: C) {
		if (typeof object === "object" && object !== null && object !== undefined && key in object) {
			if (typeof type === "string") {
				// @ts-expect-error
				return typeof object[key] === type;
			}
			if (typeof type === "function") {
				// @ts-expect-error
				return object[key] instanceof type;
			}
		}

		return false;
	}
}
