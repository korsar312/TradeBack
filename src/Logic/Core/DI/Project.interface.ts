import type { InfrastructureLinks } from "../Infrastructure/InfrastructureLinks";
import type { ServiceCatalogue } from "../Services/ServiceCatalogue";
import type { ServiceMessage } from "../Services/ServiceMessage";
import type { InfrastructureBD } from "../Infrastructure/InfrastructureBD";
import type { ServiceUser } from "../Services/ServiceUser";

export namespace ProjectInterface {
	export type TModuleInf = {
		Links: InfrastructureLinks;
		BD: InfrastructureBD;
	};

	export type TModuleService = {
		Catalogue: ServiceCatalogue;
		Message: ServiceMessage;
		User: ServiceUser;
	};

	type TDI<M> = <T extends keyof M>(key: T) => M[T];

	export type TServices = TDI<TModuleService>;
	export type TInfrastructure = TDI<TModuleInf>;

	type InvokeOf<T> = T extends { invoke: infer I } ? I : never;

	export type ActType<T> = {
		[K in keyof T]: InvokeOf<T[K]>;
	};
}
