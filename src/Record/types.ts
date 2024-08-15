import { Lambda } from "src/lambda";

export type TypeOfMap = {
	object: object;
	boolean: boolean;
	number: number;
	string: string;
	symbol: symbol;
	function: Lambda;
};

export type Assign<T, U> = T extends undefined ? T : Omit<NonNullable<T>, keyof U> & U;

export interface Keys {
	<A>(a: A): string[];
	<A, B>(a: A, b: B): string[];
}

// export type DeepAssign<T, U> = Assign<{ [P in keyof T]: DeepAssign<T[P]> }, { [P in keyof U]: DeepAssign<T[P]> }>;
