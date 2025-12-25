import { Request, Response } from "express";
import { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";

export class RestImp implements Interface.IAdapter {
	constructor(private readonly module: TModules) {}

	public async LOGIN(req: Request, res: Response) {
		res.status(200).json({ ok: true });
	}
	public async GET_GOODS(req: Request, res: Response) {
		res.status(200).json({ ok: true });
	}
	public async GET_ITEM(req: Request, res: Response) {
		res.status(200).json({ ok: true });
	}
	public async GET_ITEM_DETAIL(req: Request, res: Response) {
		res.status(200).json({ ok: true });
	}
	public async GET_ORDERS(req: Request, res: Response) {
		res.status(200).json({ ok: true });
	}
	public async GET_ORDER_DETAIL(req: Request, res: Response) {
		res.status(200).json({ ok: true });
	}
}
