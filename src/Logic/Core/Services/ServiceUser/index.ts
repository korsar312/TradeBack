import type { UserInterface as Interface } from "./User.interface.ts";
import Service from "../Service.ts";

export class ServiceUser extends Service<Interface.IAdapter> {}
