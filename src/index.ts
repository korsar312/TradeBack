import { Orchestrator } from "./Orchestrator";
import { RestCore } from "./Orchestrator/Rest/Rest.core";
import { Act } from "./Logic";
import { Links } from "./Logic/Config/List/Links";
import { RestImp } from "./Orchestrator/Rest/Imp/Rest.imp";
import { Consts } from "./Logic/Config/Consts";

const server = new Orchestrator();

const restImp = new RestImp(Act);
const rest = new RestCore(Act, restImp, Links, Consts.PORT);

server.use(rest);

server.run();
