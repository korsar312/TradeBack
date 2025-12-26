import DI from "./DI";
import LinksImp from "../Infrastructure/InfrastructureLinks/Imp/Links.imp";
import { InfrastructureLinks } from "../Infrastructure/InfrastructureLinks";
import type { ProjectInterface } from "./Project.interface.ts";
import { Links } from "../../Config/List/Links.ts";
import { createHmrSingleton } from "./CreateHmrSingleton.ts";
import { InfrastructureBD } from "../Infrastructure/InfrastructureBD";
import BDImp from "../Infrastructure/InfrastructureBD/Imp/BD.imp.ts";
import { Consts } from "../../Config/Consts.ts";

function createInfrastructure() {
	const linksImps = new LinksImp(Links);
	const links = new InfrastructureLinks(linksImps);

	const DBImps = new BDImp(Consts.BD_PATH);
	const DB = new InfrastructureBD(DBImps);

	const infrastructure = new DI<ProjectInterface.TModuleInf>();

	infrastructure.use("Links", links);
	infrastructure.use("BD", DB);

	return infrastructure.get;
}

const infrastructure = createHmrSingleton("infrastructure", createInfrastructure);
export default infrastructure;
