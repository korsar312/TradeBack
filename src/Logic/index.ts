import type { ProjectInterface } from "./Core/DI/Project.interface.ts";
import useCases from "./Core/DI/Create.useCases";
import { UseCasesInterface } from "./Domain/UseCases/UseCases.interface";

export type TModules = ProjectInterface.ActType<UseCasesInterface.TScenarioList>;

export const Act = new Proxy({} as TModules, {
	get: (_, prop: keyof UseCasesInterface.TScenarioList) => useCases.scenarioList[prop].invoke,
});
