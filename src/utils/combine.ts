import { Functions, Lambda } from "src";

export function combine(...functions: Array<Lambda<[], void> | undefined>) {
	return () => {
		functions.forEach(Functions.call);
	};
}
