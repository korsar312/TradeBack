import type { MessageInterface as Interface } from "./Message.interface.ts";
import Service from "../Service";

export class ServiceMessage extends Service<Interface.IAdapter> {}
