import { OrchestratorBase } from "./Orchestrator.base.ts";

export class Orchestrator {
	private workers: OrchestratorBase[] = [];

	public use<T extends OrchestratorBase>(worker: T) {
		this.workers.push(worker);
	}

	public run(): void {
		this.workers.forEach((w) => w.invoke());
	}
}
