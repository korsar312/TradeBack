import { OrchestratorBase } from "../Orchestrator.base.ts";
import { RestInterface, RestInterface as Interface } from "./Rest.interface.ts";
import express, { Express, NextFunction, Request, Response } from "express";
import { Utils } from "../../Logic/Core/Utils";
import { RestSchema } from "./Imp/Rest.schema.ts";
import { TModules } from "../../Logic";

export class RestCore extends OrchestratorBase {
	constructor(
		private readonly module: TModules,
		private readonly methods: RestInterface.IAdapter,
		private readonly links: Interface.TLinks,
		private readonly linksHttp: Interface.TLinksHttp,
		private readonly port: number,
	) {
		super();
	}

	public override invoke(): void {
		const app = express();

		this.registerMiddlewares(app);
		this.registerRoutes(app);

		app.use(this.notFoundHandler);

		this.start(app);
	}

	/* ======================= <REGISTER> ======================= */

	private registerMiddlewares(app: Express): void {
		// расширить: cors, logger, loginCheck
		app.use(express.json());
		app.use(this.rightChecker);
	}

	private rightChecker = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { login, token } = Utils.error.parseQuery(req.headers, RestSchema.LOGIN);
			this.module.User.login(login, token);
		} catch (e: any) {
			const { message, httpCode } = Utils.error.getError("AUTH_INVALID");

			if (res.headersSent) return;
			res.status(httpCode).json({ error: message });
		}
	};

	private registerRoutes(app: Express): void {
		(Object.keys(this.links) as Interface.ELinks[]).forEach((el) => {
			this.createLink(app, el, this.methods[el].bind(this.methods), this.linksHttp[el]);
		});
	}

	/* ======================= <REGISTER/> ======================= */

	private createLink(app: Express, linkName: Interface.ELinks, method: Interface.TMethod<any>, httpMethod: Interface.EHttpMethod): void {
		const path = this.links[linkName];
		const appMethod = app[httpMethod].bind(app);

		const innerRequest = async (req: Request, res: Response) => {
			try {
				const allParams = { ...req.body, ...req.query, ...req.params };
				Utils.error.parseQuery(allParams, RestSchema[linkName]);

				const result = await method(allParams);

				if (res.headersSent) return;
				res.status(result?.code ?? 200).json(result?.returned ?? { ok: true });
			} catch (e: any) {
				const { message, httpCode } = Utils.error.getError(e.message);

				if (res.headersSent) return;
				res.status(httpCode).json({ error: message });
			}
		};

		appMethod(path, innerRequest);
	}

	private async notFoundHandler(_req: Request, res: Response) {
		const { message, httpCode } = Utils.error.getError("ROUTE_NOT_FOUND");
		res.status(httpCode).json({ error: message });
	}

	private start(app: Express): void {
		app.listen(this.port, () => {
			console.log(`Listening on http://localhost:${this.port}`);
		});
	}
}
