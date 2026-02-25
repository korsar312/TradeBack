import { z } from "zod";
import type { RestInterface } from "../Rest.interface.ts";

export const getBalance: RestInterface.TSchemaMap["GET_BALANCE"] = z.void({});
