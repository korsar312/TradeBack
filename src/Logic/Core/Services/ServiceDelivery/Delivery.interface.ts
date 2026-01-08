export namespace DeliveryInterface {
	export interface IAdapter {
		saveNewDelivery(data: IDeliveryMin): string;
	}

	export interface IDelivery {
		id: string; // id доставки
		dealId: string; // FK deals.id (unique => 1↔1)
		status: DeliveryStatus; // статус
		trackNumber: number | null; // трек (NULL если нет)
		departurePlace: string | null; // место отправления
		deliveryPlace: string | null; // место поступления (NULL если нет)
	}

	export type IDeliveryMin = Omit<IDelivery, "id" | "status">;

	export type DeliveryStatus = keyof typeof DeliveryStatus;
}

const DeliveryStatus = {
	PENDING: "PENDING",
	IN_TRANSIT: "IN_TRANSIT",
	COMPLETE: "COMPLETE",
};
