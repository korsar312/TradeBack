export namespace ListingInterface {
	export interface IAdapter {
		createListing(data: TListingUser): void;
		updateListing(id: string, data: TListingPatch): void;
		getListing(id: string): TListing;
	}

	export type TListing = {};
	export type TListingPatch = Partial<TListing>;
	export type TListingUser = {};
}
