import { z } from "zod";
import { ItemBank, type ItemInterface, ItemTypeItem } from "../../../Logic/Domain/Services/ServiceItem/Item.interface";
import { type PublicInterface, PublicSort } from "../../../Logic/Domain/Services/Public.interface";
import { ListingInterface, ListingSaleKind } from "../../../Logic/Domain/Services/ServiceListing/Listing.interface";

export const SchemaPriceKopeks = z.number().int().nonnegative();
export const SchemaBank = z.enum(Object.keys(ItemBank) as readonly ItemInterface.EBank[]);
export const SchemaSort = z.enum(Object.keys(PublicSort) as readonly PublicInterface.ESort[]);
export const SchemaItemType = z.enum(Object.keys(ItemTypeItem) as readonly ItemInterface.ETypeItem[]);
export const SchemaListingType = z.enum(Object.keys(ListingSaleKind) as readonly ListingInterface.EListingSaleKind[]);
