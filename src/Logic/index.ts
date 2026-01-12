import type { ProjectInterface } from "./Core/DI/Project.interface.ts";
import service from "./Core/DI/Create.services";

export type TModules = ProjectInterface.ActType<ProjectInterface.TModuleService>;

export const Act = new Proxy({} as TModules, {
	get: (_, prop: keyof ProjectInterface.TModuleService) => service(prop).invoke,
});
