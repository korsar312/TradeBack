import type { ProjectInterface } from "../DI/Project.interface.ts";

export interface IServiceProps {
	infrastructure: ProjectInterface.TInfrastructure;
}

class ServiceBase {
	private readonly _infrastructure: ProjectInterface.TInfrastructure;

	constructor(params: IServiceProps) {
		this._infrastructure = params.infrastructure;
	}

	public API = new Proxy({} as ProjectInterface.ActType<ProjectInterface.TModuleInf>, {
		get: (_, prop: keyof ProjectInterface.TModuleInf) => this._infrastructure(prop).invoke,
	});
}

export default ServiceBase;
