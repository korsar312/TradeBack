export namespace ListingInterface {
	export interface IAdapter {
		createListing(data: TListingUser): void;
		updateListing(id: string, data: TListingPatch): void;
		getListing(id: string): TListing;
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

	export type EListingType = keyof typeof ListingType;
	export type EListingStatus = keyof typeof ListingStatus;

	export type TListing = {};
	export type TListingPatch = Partial<TListing>;
	export type TListingUser = {};
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
