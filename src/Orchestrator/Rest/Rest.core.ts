import { OrchestratorBase } from "../Orchestrator.base.ts";
import { RestInterface, RestInterface as Interface } from "./Rest.interface.ts";
import type { TModules } from "../../Logic";
import express, { Express, Request, Response } from "express";
import { Utils } from "../../Logic/Core/Utils";

export class RestCore extends OrchestratorBase {
	private readonly methods: RestInterface.IAdapter;

	constructor(
		module: TModules,
		Methods: RestInterface.TAdapterCtor,
		private readonly links: Interface.TLinks,
		private readonly linksHttp: Interface.TLinksHttp,
		private readonly port: number,
	) {
		super(module);
		this.methods = new Methods(module);
	}

	public override invoke(): void {
		const app = express();

		this.registerMiddlewares(app);
		this.registerRoutes(app);

		app.use(this.notFoundHandler);

		this.start(app);
	}

	private registerMiddlewares(app: Express): void {
		// расширить: cors, logger, loginCheck
		app.use(express.json());
	}

	private registerRoutes(app: Express): void {
		(Object.keys(this.links) as Interface.ELinks[]).forEach((el) => {
			this.createLink(app, el, this.methods[el].bind(this.methods), this.linksHttp[el]);
		});
	}

	private start(app: Express): void {
		app.listen(this.port, () => {
			console.log(`Listening on http://localhost:${this.port}`);
		});
	}

	private createLink(app: Express, linkName: Interface.ELinks, method: Interface.TMethod, httpMethod: Interface.EHttpMethod): void {
		const path = this.links[linkName];
		const appMethod = app[httpMethod].bind(app);

		appMethod(path, async (req: Request, res: Response) => {
			try {
				const allParams = { ...req.body, ...req.query, ...req.params };
				const result = await method(allParams);

				if (res.headersSent) return;
				res.status(result?.code ?? 200).json(result?.returned ?? { ok: true });
			} catch (e: any) {
				const { message, httpCode } = Utils.error.getError(e.message);

				if (res.headersSent) return;
				res.status(httpCode).json({ error: message });
			}
		});
	}

	private async notFoundHandler(req: Request, res: Response) {
		const { message, httpCode } = Utils.error.getError("ROUTE_NOT_FOUND");
		res.status(httpCode).json({ error: message });
	}
}
