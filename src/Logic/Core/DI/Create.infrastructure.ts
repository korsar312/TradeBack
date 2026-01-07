import DI from "./DI";
import type { ProjectInterface } from "./Project.interface.ts";
import { InfrastructureBD } from "../Infrastructure/InfrastructureBD";
import BDImp from "../Infrastructure/InfrastructureBD/Imp/BD.imp.ts";
import { Consts } from "../../Config/Consts.ts";

const DBImps = new BDImp(Consts.BD_PATH);
const DB = new InfrastructureBD(DBImps);

const infrastructure = new DI<ProjectInterface.TModuleInf>();

infrastructure.use("BD", DB);

export default infrastructure.get;
