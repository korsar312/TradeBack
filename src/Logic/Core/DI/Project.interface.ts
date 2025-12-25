import { InfrastructureLinks } from "../Infrastructure/InfrastructureLinks";
import { ServiceCatalogue } from "../Services/ServiceCatalogue";
import { ServiceMessage } from "../Services/ServiceMessage";

export namespace ProjectInterface {
	export type TModuleInf = {
		Links: InfrastructureLinks;
	};

	export type TModuleService = {
		Catalogue: ServiceCatalogue;
		Message: ServiceMessage;
	};

	type TDI<M> = <T extends keyof M>(key: T) => M[T];

	export type TServices = TDI<TModuleService>;
	export type TInfrastructure = TDI<TModuleInf>;

	type InvokeOf<T> = T extends { invoke: infer I } ? I : never;

	export type ActType<T> = {
		[K in keyof T]: InvokeOf<T[K]>;
	};
}
