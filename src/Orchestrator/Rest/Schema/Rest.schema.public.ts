import { z } from "zod";
import type { ItemInterface } from "../../../Logic/Core/Services/ServiceItem/Item.interface.ts";
import type { PublicInterface } from "../../../Logic/Core/Services/Public.interface.ts";

export const SchemaPriceKopeks = z.number().int().nonnegative();
export const SchemaBank = z.enum(["ALFA", "SBER", "TINK"] satisfies readonly ItemInterface.EBank[]);
export const SchemaSort = z.enum(["TO_UPPER", "TO_LOWER"] satisfies readonly PublicInterface.ESort[]);
