export namespace DealInterface {
	export interface IAdapter {
		saveNewDeal(data: IDealMin): string;
		getDeal(id: string): IDeal;
		getDealsByListingId(listingId: string): IDeal[];
		getDealsByUserId(userId: string): IDeal[];
		cancelDeal(id: string): void;
	}

	/**
	 * Сделка.
	 * Фиксирует процесс покупки между продавцом и покупателем.
	 */
	export interface IDeal {
		/** идентификатор сделки */
		id: string;

		/** идентификатор лота */
		listingId: string;

		/** идентификатор продавца */
		sellerId: string;

		/** идентификатор покупателя */
		buyerId: string;

		/** статус сделки */
		status: EDealStatus;

		/** когда покупатель нажал отмену сделки */
		buyerCancelAt: number | null;

		/** когда продавец нажал отмену сделки */
		sellerCancelAt: number | null;

		/** время создания сделки */
		createdAt: number;
	}

	export type IDealMin = Omit<IDeal, "id" | "status" | "buyerCancelAt" | "sellerCancelAt" | "createdAt">;
	export type EDealStatus = keyof typeof DealStatus;
}

/**
 * Статус сделки.
 * Отражает текущий этап выполнения.
 */
export const DealStatus = {
	/** в процессе сделки */
	IN_ACTIVE: "IN_ACTIVE",

	/** сделка подтверждена */
	COMPLETE: "COMPLETE",

	/** сделка отменена */
	CANCELLED: "CANCELLED",
} as const;
