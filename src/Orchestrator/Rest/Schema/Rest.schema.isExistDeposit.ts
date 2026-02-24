import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const isExistDepositReq: RestInterface.TSchemaMap["IS_EXIST_DEPOSIT"] = z.void({});
