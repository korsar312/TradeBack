import type { WalletInterface as Interface } from "./Wallet.interface.ts";
import Service from "../Service";

export class ServiceWallet extends Service<Interface.IAdapter> {}
