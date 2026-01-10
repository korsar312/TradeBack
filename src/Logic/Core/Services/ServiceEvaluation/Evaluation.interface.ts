export namespace EvaluationInterface {
	export interface IAdapter {
		createEvaluation(data: IEvaluation): void;
		getEvaluationForDealId(dealId: string): IEvaluation;
	}

	export interface IEvaluation {
		id: string; // id отзыва
		dealId: string; // FK deals.id (unique => 1↔1)
		type: EEvaluationType; // like/dislike
		comment: string; // комментарий
		createdAt: number; // время создания
	}

	export type EEvaluationType = keyof typeof EvaluationType;
}

const EvaluationType = {
	like: "like",
	dislike: "dislike",
};
