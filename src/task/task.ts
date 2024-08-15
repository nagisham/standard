import { is_promise } from "src/is";

export type Task<V> = V | Promise<V>

export namespace Task {  
	export function then<V>(onfulfilled: (value: V) => Task<V>, value: Task<V>): Task<V> {
		return is_promise(value) 
			? value.then(onfulfilled) 
			: onfulfilled(value);
	}
};
