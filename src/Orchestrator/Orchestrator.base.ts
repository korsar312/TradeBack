import type { OrchestratorInterface } from "./Orchestrator.interface.ts";
import type { TModules } from "../Logic";

export abstract class OrchestratorBase implements OrchestratorInterface.IBase {
	protected readonly module: TModules;

	protected constructor(module: TModules) {
		this.module = module;
	}

	public abstract invoke(): void;
}
