import type { ServiceMessage } from "../Services/ServiceMessage";
import type { InfrastructureBD } from "../Infrastructure/InfrastructureBD";
import type { ServiceUser } from "../Services/ServiceUser";
import type { ServiceEvaluation } from "../Services/ServiceEvaluation";
import type { ServiceDelivery } from "../Services/ServiceDelivery";
import type { ServiceChat } from "../Services/ServiceChat";
import type { ServiceDeal } from "../Services/ServiceDeal";
import type { ServiceItem } from "../Services/ServiceItem";
import type { ServiceListing } from "../Services/ServiceListing";
import type { ServicePayment } from "../Services/ServicePayment";

export namespace ProjectInterface {
	export type TModuleInf = {
		BD: InfrastructureBD;
	};

	export type TModuleService = {
		user: ServiceUser;
		chat: ServiceChat;
		deal: ServiceDeal;
		item: ServiceItem;
		listing: ServiceListing;
		payment: ServicePayment;
		message: ServiceMessage;
		delivery: ServiceDelivery;
		evaluation: ServiceEvaluation;
	};

	type TDI<M> = <T extends keyof M>(key: T) => M[T];

	export type TServices = TDI<TModuleService>;
	export type TInfrastructure = TDI<TModuleInf>;

	type InvokeOf<T> = T extends { invoke: infer I } ? I : never;

	export type ActType<T> = {
		[K in keyof T]: InvokeOf<T[K]>;
	};
}
