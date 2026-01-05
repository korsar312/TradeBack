import type { PaymentInterface as Interface } from "./Payment.interface.ts";
import Service from "../Service.ts";

export class ServicePayment extends Service<Interface.IAdapter> {}
