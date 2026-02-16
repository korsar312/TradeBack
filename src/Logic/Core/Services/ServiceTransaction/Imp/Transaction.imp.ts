import type { TransactionInterface as Interface } from "../Transaction.interface.ts";
import ServiceBase from "../../Service.base";

class TransactionImp extends ServiceBase implements Interface.IAdapter {}

export default TransactionImp;
