import { Lambda } from "src/functions";
import { Expand } from "src/types/globals";

type Struct<C extends Lambda, E extends Lambda> = Expand<
	(...args: [...Parameters<E>, ...Parameters<C>]) => ReturnType<E> & ReturnType<C>
>;

export interface StructConstructor {
	<CONSTRUCTOR extends Lambda>(implementation: CONSTRUCTOR): CONSTRUCTOR;
	<CONSTRUCTOR extends Lambda, EXTEND extends Lambda>(
		implementation: CONSTRUCTOR,
		extend?: EXTEND,
	): Struct<CONSTRUCTOR, EXTEND>;
}
