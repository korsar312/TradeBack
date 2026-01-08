export namespace ListingInterface {
	export interface IAdapter {
		saveNewListing(data: TListingMin): string;
		updateListing(id: string, data: IListing): void;
		getListing(id: string): string;
	}

	export interface IListing {
		id: string; // id объявления
		sellerId: string; // FK users.id
		type: EListingType; // тип объявления
		createdAt: number; // время создания
		status: EListingStatus; // статус
		name: string; // заголовок
		desc: string; // описание
	}

	export type TListingMin = Omit<IListing, "id" | "createdAt" | "status">;

	export type EListingType = keyof typeof ListingType;
	export type EListingStatus = keyof typeof ListingStatus;
}

const ListingType = {
	CARD: "CARD",
};

const ListingStatus = {
	DRAFT: "DRAFT",
	ACTIVE: "ACTIVE",
	RESERVED: "RESERVED",
	SOLD: "SOLD",
	ARCHIVED: "ARCHIVED",
};
