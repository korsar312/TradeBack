import { Request, Response } from "express";
import { RestInterface as Interface } from "../Rest.interface.ts";
import { TModules } from "../../../Logic";
import { ErrorInterface } from "../../../Logic/Core/Utils/Error/Error.interface.ts";

export class RestImp implements Interface.IAdapter {
	constructor(private readonly module: TModules) {}

	public async LOGIN(req: Interface.TRequest<unknown, Interface.TLoginReq>, res: Response) {
		const { login, token } = req.query;

		if (typeof login === "string" && typeof token === "string") {
			return { returned: this.module.User.login(login, token) };
		}

		throw new Error("PARAMS_NOT_VALID" satisfies ErrorInterface.EErrorReason);
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
