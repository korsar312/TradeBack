import type { PublicInterface } from "../Public.interface.ts";

export namespace ListingInterface {
	export interface IAdapter {
		saveNewListing(data: TListingMin): string;
		updateListing(id: string, data: IListing): void;
		getQtyListing(limit: number, status: EListingStatus, saleKind: EListingSaleKind, cursorId?: string, filter?: TGetParams): IListing[];
		getListing(id: string): IListing;
	}

	export interface IListingBase<T extends EListingSaleKind = EListingSaleKind> {
		id: string;
		sellerId: string;
		saleKind: T;
		createdAt: number;
		status: EListingStatus;
		name: string;
		desc: string;
		price: number;
	}

	export type TGetParams = Partial<{
		sort: PublicInterface.ESort;
		sellerId: string;
		findStr: string;
	}>;

	type UnionOf<M extends Record<PropertyKey, any>> = M[keyof M];
	type MapOmit<M extends Record<PropertyKey, any>, K extends PropertyKey> = { [P in keyof M]: Omit<M[P], K> };
	type ListingMap = { [K in EListingSaleKind]: IListingBase<K> };

	export type IListing = UnionOf<ListingMap>;
	export type TListingMin = UnionOf<MapOmit<ListingMap, "id" | "createdAt" | "status">>;

	export type EListingStatus = keyof typeof ListingStatus;
	export type EListingSaleKind = keyof typeof ListingSaleKind;
}

const ListingStatus = {
	DRAFT: "DRAFT",
	ACTIVE: "ACTIVE",
	RESERVED: "RESERVED",
	SOLD: "SOLD",
	ARCHIVED: "ARCHIVED",
} as const;

const ListingSaleKind = {
	GOODS: "GOODS",
	SERVICE: "SERVICE",
} as const;
