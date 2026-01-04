import InfrastructureBase from "../Infrastructure.base";
import type { BDInterface as Interface } from "./BD.interface.ts";

export class InfrastructureBD extends InfrastructureBase<Interface.IAdapter> {}
