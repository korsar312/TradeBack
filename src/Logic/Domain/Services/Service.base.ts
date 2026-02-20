import type { ProjectInterface } from "../../Core/DI/Project.interface.ts";

export interface IServiceProps {
	infrastructure: ProjectInterface.TInfrastructure;
}

class ServiceBase {
	constructor(private readonly params: IServiceProps) {}

	public API = new Proxy({} as ProjectInterface.ActType<ProjectInterface.TModuleInf>, {
		get: (_, prop: keyof ProjectInterface.TModuleInf) => this.params.infrastructure(prop).invoke,
	});
}

export default ServiceBase;
