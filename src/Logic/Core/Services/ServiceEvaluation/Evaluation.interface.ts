export namespace EvaluationInterface {
	export interface IAdapter {
		createEvaluation(data: IEvaluation): void;
	}

	export interface IEvaluation {
		id: string; // id отзыва
		dealId: string; // FK deals.id (unique => 1↔1)
		type: EvaluationType; // like/dislike
		comment: string; // комментарий
		createdAt: number; // время создания
	}

	export type EvaluationType = keyof typeof EvaluationType;
}

const EvaluationType = {
	like: "like",
	dislike: "dislike",
};
