import { Orchestrator } from "./Orchestrator";
import { RestCore } from "./Orchestrator/Rest/Rest.core.ts";
import { Act } from "./Logic";
import { Links, LinksHttp } from "./Logic/Config/List/Links.ts";
import { RestImp } from "./Orchestrator/Rest/Imp/Rest.imp.ts";
import { Consts } from "./Logic/Config/Consts.ts";

const server = new Orchestrator();

const rest = new RestCore(Act, RestImp, Links, LinksHttp, Consts.PORT);

server.use(rest);

server.run();
