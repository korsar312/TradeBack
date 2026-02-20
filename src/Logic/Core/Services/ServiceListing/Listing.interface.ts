import type { PublicInterface } from "../Public.interface.ts";

export namespace ListingInterface {
	export interface IAdapter {
		saveNewListing(data: TListingMin): string;
		updateListing(id: string, data: IListing): void;
		getQtyListing(limit: number, status: EListingStatus, saleKind: EListingSaleKind, cursorId?: string, filter?: TGetParams): IListing[];
		getListing(id: string): IListing;
	}

	/**
	 * Лот.
	 * Описывает предложение продавца.
	 */
	export interface IListing {
		/** уникальный номер */
		id: string;

		/** идентификатор продавца */
		sellerId: string;

		/** тип продажи */
		saleKind: EListingSaleKind;

		/** статус объявления */
		status: EListingStatus;

		/** название лота */
		name: string;

		/** описание лота */
		desc: string;

		/** цена лота */
		price: number;

		/** время создания */
		createdAt: number;

		/** время последнего обновления */
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

/**
 * Статус объявления.
 * Определяет доступность для покупки.
 */
export const ListingStatus = {
	/** активно и доступно для покупки */
	ACTIVE: "ACTIVE",

	/** приостановлено */
	FREEZE: "FREEZE",

	/** архивировано */
	ARCHIVED: "ARCHIVED",
} as const;

/**
 * Тип продажи.
 * Определяет количество возможных покупок.
 */
export const ListingSaleKind = {
	/** единичная продажа лота */
	ONE: "ONE",

	/** неограниченное количество продаж лота */
	INFINITY: "INFINITY",
} as const;
