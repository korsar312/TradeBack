import type { ServiceMessage } from "../../Domain/Services/ServiceMessage";
import type { InfrastructureBD } from "../../Domain/Infrastructure/InfrastructureBD";
import type { ServiceUser } from "../../Domain/Services/ServiceUser";
import type { ServiceEvaluation } from "../../Domain/Services/ServiceEvaluation";
import type { ServiceDelivery } from "../../Domain/Services/ServiceDelivery";
import type { ServiceChat } from "../../Domain/Services/ServiceChat";
import type { ServiceDeal } from "../../Domain/Services/ServiceDeal";
import type { ServiceItem } from "../../Domain/Services/ServiceItem";
import type { ServiceListing } from "../../Domain/Services/ServiceListing";
import type { ServicePayment } from "../../Domain/Services/ServicePayment";
import { ServiceLanguage } from "../../Domain/Services/ServiceLanguage";
import { ServiceTransaction } from "../../Domain/Services/ServiceTransaction";

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
		language: ServiceLanguage;
		evaluation: ServiceEvaluation;
		transaction: ServiceTransaction;
	};

	type TDI<M> = <T extends keyof M>(key: T) => M[T];

	export type TInfrastructure = TDI<TModuleInf>;
	export type TServices = TDI<TModuleService>;

	type InvokeOf<T> = T extends { invoke: infer I } ? I : never;

	export type ActType<T> = {
		[K in keyof T]: InvokeOf<T[K]>;
	};
}
