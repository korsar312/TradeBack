import type { ProjectInterface } from "../DI/Project.interface.ts";

export interface IServiceProps {
	infrastructure: ProjectInterface.TInfrastructure;
}

class ServiceBase<S extends object> {
	private readonly _infrastructure: ProjectInterface.TInfrastructure;
	private _store: S;

	constructor(params: IServiceProps, store: S) {
		this._infrastructure = params.infrastructure;
		this._store = store;
	}

	set store(newStore: S) {
		this._store = newStore;
	}

	get store(): S {
		return this._store;
	}

	public API = new Proxy({} as ProjectInterface.ActType<ProjectInterface.TModuleInf>, {
		get: (_, prop: keyof ProjectInterface.TModuleInf) => this._infrastructure(prop).invoke,
	});
}

export default ServiceBase;
