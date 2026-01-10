import { EvaluationInterface as Interface } from "../Evaluation.interface.ts";
import ServiceBase from "../../Service.base.ts";
import { Utils } from "../../../../../Utils";

class EvaluationImp extends ServiceBase implements Interface.IAdapter {
	public createEvaluation(data: Interface.IEvaluation) {}

	public getEvaluationForDealId(dealId: string) {
		return Utils.error.require(this.API.BD.read.Evaluation(dealId), "EVALUATION_NOT_FOUND");
	}
}

export default EvaluationImp;
