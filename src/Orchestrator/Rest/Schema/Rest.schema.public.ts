import { z } from "zod";
import { ItemBank, type ItemInterface, ItemTypeItem } from "../../../Logic/Core/Services/ServiceItem/Item.interface";
import { type PublicInterface, PublicSort } from "../../../Logic/Core/Services/Public.interface";

export const SchemaPriceKopeks = z.number().int().nonnegative();
export const SchemaBank = z.enum(Object.keys(ItemBank) as readonly ItemInterface.EBank[]);
export const SchemaSort = z.enum(Object.keys(PublicSort) as readonly PublicInterface.ESort[]);
export const SchemaItemType = z.enum(Object.keys(ItemTypeItem) as readonly ItemInterface.ETypeItem[]);
