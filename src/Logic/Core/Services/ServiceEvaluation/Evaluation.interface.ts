export namespace EvaluationInterface {
	export interface IAdapter {
		createEvaluation(data: TEvaluation): void;
	}

	export type TEvaluation = {};
	export type TEvaluationUser = {};
}
