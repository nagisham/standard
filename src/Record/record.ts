import { Lambda } from "src/functions";

import { Assign, TypeOfMap } from "./types";

export namespace Record {
	export function assign<T, U>(target: T, source: U) {
		return Object.assign(target ?? {}, source) as Assign<T, U>;
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

	export const keys = <T extends object>(object: T) => {
		return Object.keys(object) as (keyof T)[];
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
