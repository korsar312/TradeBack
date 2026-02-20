import type { PaymentInterface as Interface } from "./Payment.interface.ts";
import Service from "../Service";

export class ServicePayment extends Service<Interface.IAdapter> {}
