// https://hackage.haskell.org/package/base-4.16.3.0/docs/Data-Maybe.html#t:Maybe

import { Lambda } from "src/lambda";
import { Lazy } from "src/lazy";

const $type = Symbol();
type $type = typeof $type;

const $nothing = Symbol();
type $nothing = typeof $nothing;

interface Nothing {
	[$type]: $nothing;
}

const $some = Symbol();
type $some = typeof $some;

const $value = Symbol();
type $value = typeof $value;

interface Some<V> {
	[$type]: $some;
	[$value]: V;
}

export type Option<V> = Nothing | Some<V>;

export namespace Option {
	export const nothing: Option<unknown> = { [$type]: $nothing };

	export function some<V>(value: V): Option<V> {
		return { [$type]: $some, [$value]: value };
	}

	function value<V>(some: Some<V>) {
		return some[$value];
	}

	function is_nothing<V>(option: Option<V>) {
		return option[$type] === $nothing;
	}

	function is_some<V>(option: Option<V>) {
		return option[$type] === $some;
	}

	export const match = <V, R>(on_nothing: Lazy<R>, on_some: (value: V) => R) => (option: Option<V>) => {
    switch (true) {
      case is_nothing(option):
        return Lazy.get(on_nothing);
      case is_some(option):
        return on_some(value(option));
      default:
        throw new Error("unreachable");
    }
	}

	export const bind = <V, R>(binder: (value: V) => Option<R>) => match(nothing, binder);
	
	export const map = <V, R>(mapper: (value: V) => R) => match(nothing, Lambda.compose(mapper, some));
	/*
  export const lift: <A>(ma: Option<A>) => <B>(f: Option<(a: A) => B>) => Option<B> = (ma) => (f) => match(
		nothing,
		(value) => map((f) => f(value))(f)
	)
	(ma);
	*/
}
