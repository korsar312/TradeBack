export namespace DealInterface {
	export interface IAdapter {
		saveNewDeal(data: IDealMin): string;
		getDeal(id: string): IDeal;
		getDealsByListingId(listingId: string): IDeal[];
	}

	export interface IDeal {
		id: string; // id сделки
		listingId: string; // FK listings.id (unique)
		sellerId: string; // FK users.id
		buyerId: string; // FK users.id
		status: EDealStatus; // статус
		buyerCancelAt: number | null; // когда покупатель нажал отмену сделки
		sellerCancelAt: number | null; // когда продавец нажал отмену сделки
		createdAt: number; // время создания сделки
	}

	export type IDealMin = Omit<IDeal, "id" | "status">;
	export type EDealStatus = keyof typeof DealStatus;
}

export const DealStatus = {
	IN_ACTIVE: "IN_ACTIVE", // в процессе сделки
	COMPLETE: "COMPLETE", // сделка подтверждена
	CANCELLED: "CANCELLED", // сделка отменена
} as const;
