export namespace DealInterface {
	export interface IAdapter {
		saveNewDeal(data: IDealMin): string;
		getDeal(id: string): IDeal;
		getDealsByListingIds(listingIds: string[]): IDeal[];
	}

	export interface IDeal {
		id: string; // id сделки
		listingId: string; // FK listings.id (unique)
		sellerId: string; // FK users.id
		buyerId: string | null; // FK users.id
		status: EDealStatus; // статус
	}

	export type IDealMin = Omit<IDeal, "id" | "status" | "buyerId">;
	export type EDealStatus = keyof typeof DealStatus;
}

const DealStatus = {
	PENDING_PAYMENT: "PENDING_PAYMENT",
	IN_ESCROW: "IN_ESCROW",
	FULFILLED: "FULFILLED",
	COMPLETE: "COMPLETE",
	CANCELLED: "CANCELLED",
	DISPUTED: "DISPUTED",
};
