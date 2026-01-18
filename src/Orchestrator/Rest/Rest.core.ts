import { OrchestratorBase } from "../Orchestrator.base";
import type { RestInterface as Interface } from "./Rest.interface.ts";
import express, { Express, NextFunction, Request, Response } from "express";
import { TModules } from "../../Logic";
import { Utils } from "../../Utils";
import { type UserInterface, UserRole } from "../../Logic/Core/Services/ServiceUser/User.interface";
import { ErrorSys } from "../../Utils/Error/Error.imp";
import { RestSchema } from "./Schema/Rest.schema";
import cors from "cors";

const routeNoCheck: Interface.ELinks[] = ["LOGIN", "REGISTER"];

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

		this.role = (Object.keys(UserRole) as UserInterface.ERole[]).reduce((prev, cur) => {
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
		app.use(express.json());
		app.use(this.CORS());
		app.use(this.rightChecker);
	}

	private registerRoutes(app: Express): void {
		(Object.keys(this.links) as Interface.ELinks[]).forEach((el) => {
			this.createLink(app, el, this.methods[el].bind(this.methods), this.links[el].http);
		});
	}

	/* ======================= MIDDLEWARE ======================= */

	private CORS = () => {
		return cors({
			// `origin` — значение заголовка Origin (например "http://localhost:3000").
			origin: (origin, cb) => {
				// Если Origin отсутствует (curl/postman/сервер-сервер) — разрешаем.
				if (!origin) return cb(null, true);

				// Белый список разрешённых origins (фронт).
				const allow = ["http://localhost:3000", "http://127.0.0.1:3000"];

				// Если origin в белом списке — разрешаем.
				if (allow.includes(origin)) return cb(null, true);

				// Иначе запрещаем: браузер заблокирует запрос из этого origin.
				return cb(new Error("CORS: origin not allowed"));
			},

			// Разрешаем отправку credentials:
			// cookies / Authorization / другие "учётные" данные.
			// Важно: при credentials нельзя использовать Access-Control-Allow-Origin: "*".
			credentials: true,

			// Разрешённые HTTP-методы в CORS.
			methods: [...new Set(Object.values(this.links).map((el) => el.http))],

			// Разрешённые заголовки, которые браузер может отправлять в кросс-доменном запросе.
			// Нужны для preflight: браузер спросит OPTIONS, сервер должен разрешить эти headers.
			allowedHeaders: ["Content-Type", "Authorization", "login", "token"],

			// Заголовки, которые браузеру разрешено читать из ответа через JS.
			// Если нужно читать, например, "X-Request-Id" — добавляешь сюда.
			exposedHeaders: [],

			// На сколько секунд браузер может кэшировать результат preflight (OPTIONS).
			// 86400 = 24 часа, меньше OPTIONS-запросов, быстрее фронт.
			maxAge: 86400,
		});
	};

	private rightChecker = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const route = req.path;

			const routeNoCheckPath = routeNoCheck.map((el) => this.links[el].link);
			const isNoCheck = routeNoCheckPath.includes(route);
			if (isNoCheck) return next();

			const { login, token } = Utils.error.parseQuery(req.headers, RestSchema.LOGIN, "UNAUTHORIZE");
			const userId = this.module.user.login(login, token);
			const user = this.module.user.getUser(userId);

			const routeRight = this.role[user.role] || [];
			const isAccess = routeRight.includes(route);
			if (!isAccess) throw Utils.error.createError({ reason: "NOT_RIGHT", data: `${route} !== ${routeRight}` });

			res.locals.userId = userId;

			return next();
		} catch (e: unknown) {
			this.errorHandler(res, e);
		}
	};

	private async notFoundHandler(req: Request, res: Response) {
		const { message, httpCode } = Utils.error.getError({ reason: "ROUTE_NOT_FOUND", data: req.path });
		res.status(httpCode).json({ error: message });
	}

	/* ======================= MAIN ======================= */

	private createLink(app: Express, linkName: Interface.ELinks, method: Interface.TMethod<any>, httpMethod: Interface.EHttpMethod): void {
		const path = this.links[linkName].link;
		const appMethod = app[httpMethod].bind(app);

		const innerRequest = async (req: Request, res: Response) => {
			try {
				const allParams = Array.isArray(req.body) ? req.body : { ...req.body, ...req.query, ...req.params };
				Utils.error.parseQuery(allParams, RestSchema[linkName]);

				const result = await method(allParams, res.locals.userId);

				if (res.headersSent) return;
				res.status(result?.code ?? 200).json(result?.returned ?? { ok: true });
			} catch (e: unknown) {
				this.errorHandler(res, e);
			}
		};

		appMethod(path, innerRequest);
	}

	private start(app: Express): void {
		app.listen(this.port, () => {
			console.log(`Listening on http://localhost:${this.port}`);
		});
	}

	private errorHandler(res: Response, e: unknown): void {
		const { message, httpCode, data } = e instanceof ErrorSys ? e : Utils.error.unknownError;

		if (res.headersSent) return;
		res.status(httpCode).json({ error: message, detail: data });
	}
}
