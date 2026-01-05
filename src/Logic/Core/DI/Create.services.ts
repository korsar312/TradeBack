import DI from "./DI";
import Infrastructure from "./Create.infrastructure";
import { createHmrSingleton } from "./CreateHmrSingleton.ts";
import type { ProjectInterface } from "./Project.interface.ts";
import type { IServiceProps } from "../Services/Service.base.ts";
import MessageImp from "../Services/ServiceMessage/Imp/Message.imp.ts";
import dictionary from "../../Config/List/Dictionary.ts";
import { ServiceMessage } from "../Services/ServiceMessage";
import UserImp from "../Services/ServiceUser/Imp/User.imp.ts";
import { ServiceUser } from "../Services/ServiceUser";
import ChatImp from "../Services/ServiceChat/Imp/Chat.imp.ts";
import { ServiceChat } from "../Services/ServiceChat";
import DealImp from "../Services/ServiceDeal/Imp/Deal.imp.ts";
import { ServiceDeal } from "../Services/ServiceDeal";
import ItemImp from "../Services/ServiceItem/Imp/Item.imp.ts";
import { ServiceItem } from "../Services/ServiceItem";
import ListingImp from "../Services/ServiceListing/Imp/Listing.imp.ts";
import { ServiceListing } from "../Services/ServiceListing";
import PaymentImp from "../Services/ServicePayment/Imp/Payment.imp.ts";
import { ServicePayment } from "../Services/ServicePayment";
import DeliveryImp from "../Services/ServiceDelivery/Imp/Delivery.imp.ts";
import { ServiceDelivery } from "../Services/ServiceDelivery";
import EvaluationImp from "../Services/ServiceEvaluation/Imp/Evaluation.imp.ts";
import { ServiceEvaluation } from "../Services/ServiceEvaluation";

function createServices() {
	const inf: IServiceProps = { infrastructure: Infrastructure };

	const userImp = new UserImp(inf);
	const user = new ServiceUser(userImp);

	const chatImp = new ChatImp(inf);
	const chat = new ServiceChat(chatImp);

	const dealImp = new DealImp(inf);
	const deal = new ServiceDeal(dealImp);

	const itemImp = new ItemImp(inf);
	const item = new ServiceItem(itemImp);

	const listingImp = new ListingImp(inf);
	const listing = new ServiceListing(listingImp);

	const paymentImp = new PaymentImp(inf);
	const payment = new ServicePayment(paymentImp);

	const messageImp = new MessageImp(inf, dictionary);
	const message = new ServiceMessage(messageImp);

	const deliveryImp = new DeliveryImp(inf);
	const delivery = new ServiceDelivery(deliveryImp);

	const evaluationImp = new EvaluationImp(inf);
	const evaluation = new ServiceEvaluation(evaluationImp);

	const service = new DI<ProjectInterface.TModuleService>();

	service.use("user", user);
	service.use("chat", chat);
	service.use("deal", deal);
	service.use("item", item);
	service.use("listing", listing);
	service.use("payment", payment);
	service.use("message", message);
	service.use("delivery", delivery);
	service.use("evaluation", evaluation);

	return service.get;
}

const services = createHmrSingleton("services", createServices);
export default services;
