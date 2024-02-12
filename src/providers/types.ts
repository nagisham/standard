export interface Provider<VALUE = any> {
	get(): VALUE;
	set(value: VALUE): void;
	delete(): boolean;
}
