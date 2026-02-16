import type { PublicInterface } from "../Public.interface.ts";

export namespace ListingInterface {
	export interface IAdapter {
		saveNewListing(data: TListingMin): string;
		updateListing(id: string, data: IListing): void;
		getQtyListing(limit: number, status: EListingStatus, saleKind: EListingSaleKind, cursorId?: string, filter?: TGetParams): IListing[];
		getListing(id: string): IListing;
	}

	export interface IListing {
		id: string;
		sellerId: string;
		saleKind: EListingSaleKind;
		status: EListingStatus;
		name: string;
		desc: string;
		price: number;
		createdAt: number;
		updatedAt: number;
	}

	export type TGetParams = Partial<{
		sort: PublicInterface.ESort;
		sellerId: string;
		findStr: string;
	}>;

	export type TListingMin = Omit<IListing, "id" | "createdAt" | "status" | "updatedAt">;

	export type EListingStatus = keyof typeof ListingStatus;
	export type EListingSaleKind = keyof typeof ListingSaleKind;
}

export const ListingStatus = {
	ACTIVE: "ACTIVE",
	FREEZE: "FREEZE",
	ARCHIVED: "ARCHIVED",
} as const;

export const ListingSaleKind = {
	ONE: "ONE",
	INFINITY: "INFINITY",
} as const;
