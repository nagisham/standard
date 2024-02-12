import { Lambda } from "src";

import { is_function } from "./is";

export function unpack<VALUE, ARGS extends any[]>(
	value: VALUE | Lambda<ARGS, VALUE>,
	...args: ARGS
) {
	return is_function(value) ? value(...args) : value;
}
