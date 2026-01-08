import { OrchestratorBase } from "../Orchestrator.base.ts";
import { RestInterface as Interface } from "./Rest.interface.ts";
import express, { Express, NextFunction, Request, Response } from "express";
import { RestSchema } from "./Imp/Rest.schema.ts";
import { TModules } from "../../Logic";
import { Utils } from "../../Utils";
import { ErrorInterface } from "../../Utils/Error/Error.interface.ts";
import { Role, UserInterface } from "../../Logic/Core/Services/ServiceUser/User.interface.ts";

const routeNoCheck: Interface.ELinks[] = ["LOGIN"];

function pickRoleLink(links: Interface.TLinks, role: UserInterface.ERole): string[] {
	return Object.entries(links)
		.filter(([_key, value]) => value.role.includes(role))
		.map(([_key, value]) => value.link);
}

export class RestCore extends OrchestratorBase {
	private readonly role: Interface.TRouteRole;

	constructor(
		private readonly module: TModules,
		private readonly methods: Interface.IAdapter,
		private readonly links: Interface.TLinks,
		private readonly port: number,
	) {
		super();

		this.role = (Object.keys(Role) as UserInterface.ERole[]).reduce((prev, cur) => {
			return { ...prev, [cur]: pickRoleLink(links, cur) };
		}, {} as Interface.TRouteRole);
	}

	public override invoke(): void {
		const app = express();

		this.registerMiddlewares(app);
		this.registerRoutes(app);

		app.use(this.notFoundHandler);

		this.start(app);
	}

	/* ======================= REGISTER ======================= */

	private registerMiddlewares(app: Express): void {
		// расширить: cors, logger, loginCheck
		app.use(express.json());
		app.use(this.rightChecker);
	}

	private registerRoutes(app: Express): void {
		(Object.keys(this.links) as Interface.ELinks[]).forEach((el) => {
			this.createLink(app, el, this.methods[el].bind(this.methods), this.links[el].http);
		});
	}

	/* ======================= MIDDLEWARE ======================= */

	private rightChecker = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const route = req.path as Interface.ELinks;

			const routeNoCheckPath = routeNoCheck.map((el) => this.links[el].link);
			const isNoCheck = routeNoCheckPath.includes(route);
			if (isNoCheck) return next();

			const { login, token } = Utils.error.parseQuery(req.headers, RestSchema.LOGIN, "UNAUTHORIZE");
			const userId = this.module.user.login(login, token);
			const user = this.module.user.getUser(userId);

			const routeRight = this.role[user.role] || [];
			const isAccess = routeRight.includes(route);
			if (!isAccess) throw new Error("NOT_RIGHT" satisfies ErrorInterface.EErrorReason);

			res.locals.userId = userId;

			return next();
		} catch (e: any) {
			const { message, httpCode } = Utils.error.getError(e.message);

			if (res.headersSent) return;
			res.status(httpCode).json({ error: message });
		}
	};

	private async notFoundHandler(_req: Request, res: Response) {
		const { message, httpCode } = Utils.error.getError("ROUTE_NOT_FOUND");
		res.status(httpCode).json({ error: message });
	}

	/* ======================= MAIN ======================= */

	private createLink(app: Express, linkName: Interface.ELinks, method: Interface.TMethod<any>, httpMethod: Interface.EHttpMethod): void {
		const path = this.links[linkName].link;
		const appMethod = app[httpMethod].bind(app);

		const innerRequest = async (req: Request, res: Response) => {
			try {
				const allParams = { ...req.body, ...req.query, ...req.params };
				Utils.error.parseQuery(allParams, RestSchema[linkName]);

				const result = await method(allParams, res.locals.userId);

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

	private start(app: Express): void {
		app.listen(this.port, () => {
			console.log(`Listening on http://localhost:${this.port}`);
		});
	}
}
