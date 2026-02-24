import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const awaitPayDepositReq: RestInterface.TSchemaMap["AWAIT_PAY_DEPOSIT"] = z.void({});
