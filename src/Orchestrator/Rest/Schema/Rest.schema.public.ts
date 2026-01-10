import { z } from "zod";
import { PublicBank, PublicInterface, PublicSort, PublicTypeItem } from "../../../Logic/Core/Services/Public.interface.ts";

export const SchemaSort: z.ZodType<PublicInterface.ESort> = z.enum(Object.keys(PublicSort) as PublicInterface.ESort[]);
export const SchemaBank: z.ZodType<PublicInterface.EBank> = z.enum(Object.keys(PublicBank) as PublicInterface.EBank[]);
export const SchemaListingType: z.ZodType<PublicInterface.ETypeItem> = z.enum(Object.keys(PublicTypeItem) as PublicInterface.ETypeItem[]);
export const SchemaPriceKopeks = z.number().int().nonnegative();
