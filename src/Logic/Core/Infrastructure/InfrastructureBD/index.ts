import type { BDInterface as Interface } from "./BD.interface.ts";
import InfrastructureBase from "../Infrastructure.base";

export class InfrastructureBD extends InfrastructureBase<Interface.IAdapter> {}
