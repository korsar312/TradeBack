import DI from "./DI";
import Infrastructure from "./Create.infrastructure";
import { createHmrSingleton } from "./CreateHmrSingleton.ts";
import type { ProjectInterface } from "./Project.interface.ts";
import type { IServiceProps } from "../Services/Service.base.ts";
import CatalogueImp from "../Services/ServiceCatalogue/Imp/Catalogue.imp.ts";
import { ServiceCatalogue } from "../Services/ServiceCatalogue";
import MessageImp from "../Services/ServiceMessage/Imp/Message.imp.ts";
import dictionary from "../../Config/List/Dictionary.ts";
import { ServiceMessage } from "../Services/ServiceMessage";
import UserImp from "../Services/ServiceUser/Imp/User.imp.ts";
import { ServiceUser } from "../Services/ServiceUser";

function createServices() {
	const inf: IServiceProps = { infrastructure: Infrastructure };

	const catalogueImp = new CatalogueImp(inf);
	const catalogue = new ServiceCatalogue(catalogueImp);

	const messageImp = new MessageImp(inf, dictionary);
	const message = new ServiceMessage(messageImp);

	const userImp = new UserImp(inf);
	const user = new ServiceUser(userImp);

	const service = new DI<ProjectInterface.TModuleService>();

	service.use("Catalogue", catalogue);
	service.use("Message", message);
	service.use("User", user);

	return service.get;
}

const services = createHmrSingleton("services", createServices);
export default services;
