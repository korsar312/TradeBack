import type { TransactionInterface as Interface } from "./Transaction.interface.ts";
import Service from "../Service";

export class ServiceTransaction extends Service<Interface.IAdapter> {}
