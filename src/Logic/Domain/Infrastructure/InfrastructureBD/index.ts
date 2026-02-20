import BaseInfrastructure from "../Infrastructure.base";
import type { BDInterface as Interface } from "./BD.interface.ts";

export class InfrastructureBD extends BaseInfrastructure<Interface.IAdapter> {}
