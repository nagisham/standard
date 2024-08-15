// https://hackage.haskell.org/package/optics-core-0.4.1.1/docs/Optics-Prism.html

import { Option } from "src/option";
import { pipe } from "src/pipe";
import { Record } from "src/record";

const $build = Symbol();
type $build = typeof $build;

const $get = Symbol();
type $get = typeof $get;

export type Prism<S, V> = {
	[$build]: (value: V) => S;
	[$get]: (source: S) => Option<V>;
};

export namespace Prism {
	// prism' :: (v -> s) -> (s -> Maybe v) -> Prism s s v v
	export function create<S, V>(build: (value: V) => S, get: (source: S) => Option<V>): Prism<S, V> {
		return { [$build]: build, [$get]: get };
	}

	export function build<S, V>(value: V,prism: Prism<S, V>) {
		return prism[$build](value);
	}
	
	export function get<S, V>(source: S, prism: Prism<S, V>) {
		return prism[$get](source);
	}
	
	export function set<S extends object, V>(source: S, value: V, prism: Prism<S, V>) {
		return Record.assign(Prism.build(value, prism), source);
	}

	export function over<S extends object, V>(source: S, lambda: (value: V) => V, prism: Prism<S, V>) {
		return pipe(
			Prism.get(source, prism),
			Option.map(lambda),
			Option.match(
				source,
				(value) => Prism.set(source, value, prism)
			),
		);
	}

	export function compose<S, M1, V>(prism1: Prism<S, M1>, prism2: Prism<M1, V>): Prism<S, V>;
	export function compose<S, M1, M2, V>(prism1: Prism<S, M1>, prism2: Prism<M1, M2>, prism3: Prism<M2, V>): Prism<S, V>;
	export function compose<S, M1, M2, M3, V>(prism1: Prism<S, M1>, prism2: Prism<M1, M2>, prism3: Prism<M2, M3>, prism4: Prism<M3, V>): Prism<S, V>;
	export function compose<S, M1, M2, M3, M4, V>(prism1: Prism<S, M1>, prism2: Prism<M1, M2>, prism3: Prism<M2, M3>, prism4: Prism<M3, M4>, prism5: Prism<M4, V>): Prism<S, V>;
	export function compose(...prisms: Prism<any, any>[]) {
		return prisms.reduceRight((left, right) =>
			Prism.create(
				(value) => Prism.build(Prism.build(value, left), right),
				(source) => Option.bind((value) => Prism.get(value, right))(Prism.get(source, left)),
			),
		);
	}
}
