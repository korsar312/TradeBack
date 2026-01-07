import type { EvaluationInterface as Interface } from "../Evaluation.interface.ts";
import ServiceBase from "../../Service.base.ts";

class EvaluationImp extends ServiceBase implements Interface.IAdapter {
	public createEvaluation(data: Interface.IEvaluation) {}
}

export default EvaluationImp;
