export type Lambda<A extends any[] = any[], R = any> = (...args: A) => R;
export type Args = [...args: unknown[]];

export type Arguments<T extends Lambda> = T extends {
	(...args: infer P1): any;
	(...args: infer P2): any;
	(...args: infer P3): any;
	(...args: infer P4): any;
}
	? P1 | P2 | P3 | P4
	: T extends { (...args: infer P1): any; (...args: infer P2): any; (...args: infer P3): any }
	? P1 | P2 | P3
	: T extends { (...args: infer P1): any; (...args: infer P2): any }
	? P1 | P2
	: T extends (...args: infer P) => any
	? P
	: never;

export type Returns<T extends Lambda> = T extends {
	(...args: any): infer R1;
	(...args: any): infer R2;
	(...args: any): infer R3;
	(...args: any): infer R4;
}
	? R1 | R2 | R3 | R4
	: T extends { (...args: any): infer R1; (...args: any): infer R2; (...args: any): infer R3 }
	? R1 | R2 | R3
	: T extends { (...args: any): infer R1; (...args: any): infer R2 }
	? R1 | R2
	: T extends (...args: any) => infer R
	? R
	: never;
