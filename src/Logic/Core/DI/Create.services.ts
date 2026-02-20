import DI from "./DI";
import Infrastructure from "./Create.infrastructure";
import type { ProjectInterface } from "./Project.interface.ts";
import type { IServiceProps } from "../../Domain/Services/Service.base.ts";
import MessageImp from "../../Domain/Services/ServiceMessage/Imp/Message.imp";
import dictionary from "../../Config/List/Dictionary";
import { ServiceMessage } from "../../Domain/Services/ServiceMessage";
import UserImp from "../../Domain/Services/ServiceUser/Imp/User.imp";
import { ServiceUser } from "../../Domain/Services/ServiceUser";
import ChatImp from "../../Domain/Services/ServiceChat/Imp/Chat.imp";
import { ServiceChat } from "../../Domain/Services/ServiceChat";
import DealImp from "../../Domain/Services/ServiceDeal/Imp/Deal.imp";
import { ServiceDeal } from "../../Domain/Services/ServiceDeal";
import ItemImp from "../../Domain/Services/ServiceItem/Imp/Item.imp";
import { ServiceItem } from "../../Domain/Services/ServiceItem";
import ListingImp from "../../Domain/Services/ServiceListing/Imp/Listing.imp";
import { ServiceListing } from "../../Domain/Services/ServiceListing";
import PaymentImp from "../../Domain/Services/ServicePayment/Imp/Payment.imp";
import { ServicePayment } from "../../Domain/Services/ServicePayment";
import DeliveryImp from "../../Domain/Services/ServiceDelivery/Imp/Delivery.imp";
import { ServiceDelivery } from "../../Domain/Services/ServiceDelivery";
import EvaluationImp from "../../Domain/Services/ServiceEvaluation/Imp/Evaluation.imp";
import { ServiceEvaluation } from "../../Domain/Services/ServiceEvaluation";
import LanguageImp from "../../Domain/Services/ServiceLanguage/Imp/Language.imp";
import { ServiceLanguage } from "../../Domain/Services/ServiceLanguage";
import TransactionImp from "../../Domain/Services/ServiceTransaction/Imp/Transaction.imp";
import { ServiceTransaction } from "../../Domain/Services/ServiceTransaction";
import { Consts } from "../../Config/Consts";
import CashFlowImp from "../../Domain/Services/ServiceCashFlow/Imp/CashFlow.imp";
import { ServiceCashFlow } from "../../Domain/Services/ServiceCashFlow";

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

const paymentImp = new PaymentImp(inf, Consts.FEE);
const payment = new ServicePayment(paymentImp);

const cashFlowImp = new CashFlowImp(inf);
const cashFlow = new ServiceCashFlow(cashFlowImp);

const messageImp = new MessageImp(inf);
const message = new ServiceMessage(messageImp);

const deliveryImp = new DeliveryImp(inf);
const delivery = new ServiceDelivery(deliveryImp);

const evaluationImp = new EvaluationImp(inf);
const evaluation = new ServiceEvaluation(evaluationImp);

const transactionImp = new TransactionImp(inf, Consts.SYSTEM_USER);
const transaction = new ServiceTransaction(transactionImp);

const languageImp = new LanguageImp(inf, dictionary);
const language = new ServiceLanguage(languageImp);

const service = new DI<ProjectInterface.TModuleService>();

service.use("user", user);
service.use("chat", chat);
service.use("deal", deal);
service.use("item", item);
service.use("listing", listing);
service.use("payment", payment);
service.use("message", message);
service.use("cashFlow", cashFlow);
service.use("delivery", delivery);
service.use("language", language);
service.use("evaluation", evaluation);
service.use("transaction", transaction);

export default service.get;
