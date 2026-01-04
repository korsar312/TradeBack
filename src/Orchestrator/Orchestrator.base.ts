import type { OrchestratorInterface } from "./Orchestrator.interface.ts";

export abstract class OrchestratorBase implements OrchestratorInterface.IBase {
	public abstract invoke(): void;
}
