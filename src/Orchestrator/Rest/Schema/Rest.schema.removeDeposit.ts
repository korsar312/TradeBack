import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const removeDepositReq: RestInterface.TSchemaMap["REMOVE_DEPOSIT"] = z.void({});
