// https://hackage.haskell.org/package/optics-core-0.4.1.1/docs/Optics-Lens.html

const $get = Symbol();
type $get = typeof $get;

const $set = Symbol();
type $set = typeof $set;

export type Lens<S, V> = {
	[$get]: (source: S) => V;
	[$set]: (source: S, value: V) => S;
};

export namespace Lens {
	// lens' :: (s -> v) -> (s -> v -> s) -> Lens s s v v
	export function create<S, V>(get: (source: S) => V, set: (source: S, value: V) => S): Lens<S, V> {
		return { [$get]: get, [$set]: set };
	}

	export function get<S, V>(source: S, lens: Lens<S, V>) {
		return lens[$get](source);
	}

	export function set<S, V>(source: S, value: V, lens: Lens<S, V>) {
		return lens[$set](source, value);
	}

	export function over<S, V>(source: S, lambda: (value: V) => V, lens: Lens<S, V>) {
		return Lens.set(source, lambda(Lens.get(source, lens)), lens);
	}

	export function compose<S, M1, V>(lens1: Lens<S, M1>, lens2: Lens<M1, V>): Lens<S, V>;
	export function compose<S, M1, M2, V>(lens1: Lens<S, M1>, lens2: Lens<M1, M2>, lens3: Lens<M2, V>): Lens<S, V>;
	export function compose<S, M1, M2, M3, V>(lens1: Lens<S, M1>, lens2: Lens<M1, M2>, lens3: Lens<M2, M3>, lens4: Lens<M3, V>): Lens<S, V>;
	export function compose<S, M1, M2, M3, M4, V>(lens1: Lens<S, M1>, lens2: Lens<M1, M2>, lens3: Lens<M2, M3>, lens4: Lens<M3, M4>, lens5: Lens<M4, V>): Lens<S, V>;
	export function compose(...lenses: Lens<any, any>[]) {
		return lenses.reduceRight((left, right) =>
			Lens.create(
				(source) => Lens.get(Lens.get(source, left), right),
				(source, value) => Lens.set(source, Lens.set(Lens.get(source, right), value, left), right),
			),
		);
	}
}
