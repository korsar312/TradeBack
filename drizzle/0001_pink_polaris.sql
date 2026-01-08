PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_deals` (
	`id` text PRIMARY KEY NOT NULL,
	`listing_id` text NOT NULL,
	`seller_id` text NOT NULL,
	`buyer_id` text,
	`status` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_deals`("id", "listing_id", "seller_id", "buyer_id", "status") SELECT "id", "listing_id", "seller_id", "buyer_id", "status" FROM `deals`;--> statement-breakpoint
DROP TABLE `deals`;--> statement-breakpoint
ALTER TABLE `__new_deals` RENAME TO `deals`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`deal_id` text NOT NULL,
	`status` text NOT NULL,
	`track_number` integer,
	`departure_place` text,
	`delivery_place` text
);
--> statement-breakpoint
INSERT INTO `__new_deliveries`("id", "deal_id", "status", "track_number", "departure_place", "delivery_place") SELECT "id", "deal_id", "status", "track_number", "departure_place", "delivery_place" FROM `deliveries`;--> statement-breakpoint
DROP TABLE `deliveries`;--> statement-breakpoint
ALTER TABLE `__new_deliveries` RENAME TO `deliveries`;