export namespace DeliveryInterface {
	export interface IAdapter {
		createDelivery(data: TDelivery): void;
	}

	export type TDelivery = {};
	export type TDeliveryUser = {};
}
