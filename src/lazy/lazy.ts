import { Lambda } from "src/lambda";
import { is_function } from "src/is";

export type Lazy<A> = Lambda<[], A> | A;

export namespace Lazy {
  export function get<A>(value: Lazy<A>) {
    if(is_function(value)) return value();
    return value;
  }
}
