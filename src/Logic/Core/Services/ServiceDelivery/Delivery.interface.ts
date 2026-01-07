export namespace DeliveryInterface {
	export interface IAdapter {
		createDelivery(data: IDelivery): void;
	}

	export interface IDelivery {
		id: string; // id доставки
		dealId: string; // FK deals.id (unique => 1↔1)
		status: DeliveryStatus; // статус
		trackNumber: number | null; // трек (NULL если нет)
		departurePlace: string; // место отправления
		deliveryPlace: string | null; // место поступления (NULL если нет)
	}

	export type DeliveryStatus = keyof typeof DeliveryStatus;
}

const DeliveryStatus = {
	PENDING: "PENDING",
	IN_TRANSIT: "IN_TRANSIT",
	COMPLETE: "COMPLETE",
};
