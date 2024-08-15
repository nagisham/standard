export namespace Monad {  
	export const insert = <M>(monad: M) => <A extends any[], R>(insertable: (...args: A) => (monad: M) => R) => {
		return (...args: A) => insertable(...args)(monad);
	}
}
