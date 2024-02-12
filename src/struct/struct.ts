import { Lambda } from "src/functions";
import { Record } from "src/record";
import { Seq } from "src/seq";

import { StructConstructor } from "./types";

export const struct: StructConstructor = <CONSTRUCTOR extends Lambda, EXTEND extends Lambda>(
	implementation: CONSTRUCTOR,
	extend?: EXTEND,
) => {
	function Struct() {
		return Record.setConstructor(
			extend
				? Object.assign(
						extend(...Seq.iterable(arguments, 0, extend.length)),
						implementation(...Seq.iterable(arguments, extend.length)),
				  )
				: implementation(...arguments),
			Struct,
		);
	}

	Object.defineProperties(Struct, {
		name: {
			value: implementation.name,
			configurable: false,
			enumerable: false,
			writable: false,
		},
		length: {
			value: implementation.length,
			configurable: false,
			enumerable: false,
			writable: false,
		},
	});

	if (extend) {
		Object.setPrototypeOf(Struct, extend.prototype);
		Object.setPrototypeOf(Struct.prototype, extend.prototype);
	}

	return Struct;
};
