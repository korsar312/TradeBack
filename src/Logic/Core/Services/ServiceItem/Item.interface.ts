export namespace ItemInterface {
	export interface IAdapter {
		createItem(data: TItem): void;
	}

	export type TItem = {};
	export type TItemUser = {};
}
