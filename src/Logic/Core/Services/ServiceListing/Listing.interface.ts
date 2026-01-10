import { PublicInterface } from "../Public.interface.ts";

export namespace ListingInterface {
	export interface IAdapter {
		saveNewListing(data: TListingMin): string;
		updateListing(id: string, data: IListing): void;
		getQtyListing(qty: number, status: EListingStatus, onId?: string, filter?: TGetParams): IListing[];
	}

	export interface IListing {
		id: string; // id объявления
		sellerId: string; // FK users.id
		type: PublicInterface.ETypeItem; // тип объявления
		createdAt: number; // время создания
		status: EListingStatus; // статус
		name: string; // заголовок
		desc: string; // описание
	}

	export type TListingMin = Omit<IListing, "id" | "createdAt" | "status">;

	export type TGetParams = Partial<{
		type: PublicInterface.ETypeItem;
		sort: PublicInterface.ESort;
		sellerId: string;
		findStr: string;
	}>;

	export type EListingStatus = keyof typeof ListingStatus;
}

const ListingStatus = {
	DRAFT: "DRAFT",
	ACTIVE: "ACTIVE",
	RESERVED: "RESERVED",
	SOLD: "SOLD",
	ARCHIVED: "ARCHIVED",
};
