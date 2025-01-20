import { sql } from "drizzle-orm";
import { index, integer, numeric, pgTable, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const eventData = pgTable("event_data", {
	eventDataId: uuid("event_data_id").primaryKey().notNull(),
	websiteId: uuid("website_id").notNull(),
	websiteEventId: uuid("website_event_id").notNull(),
	dataKey: varchar("data_key", { length: 500 }).notNull(),
	stringValue: varchar("string_value", { length: 500 }),
	numberValue: numeric("number_value", { precision: 19, scale:  4 }),
	dateValue: timestamp("date_value", { precision: 6, withTimezone: true, mode: 'date' }),
	dataType: integer("data_type").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'date' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("event_data_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("event_data_website_event_id_idx").using("btree", table.websiteEventId.asc().nullsLast().op("uuid_ops")),
	index("event_data_website_id_created_at_data_key_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops"), table.dataKey.asc().nullsLast().op("text_ops")),
	index("event_data_website_id_created_at_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("uuid_ops")),
	index("event_data_website_id_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops")),
]);

export const websiteEvent = pgTable("website_event", {
	eventId: uuid("event_id").primaryKey().notNull(),
	websiteId: uuid("website_id").notNull(),
	sessionId: uuid("session_id").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'date' }).default(sql`CURRENT_TIMESTAMP`),
	urlPath: varchar("url_path", { length: 500 }).notNull(),
	urlQuery: varchar("url_query", { length: 500 }),
	referrerPath: varchar("referrer_path", { length: 500 }),
	referrerQuery: varchar("referrer_query", { length: 500 }),
	referrerDomain: varchar("referrer_domain", { length: 500 }),
	pageTitle: varchar("page_title", { length: 500 }),
	eventType: integer("event_type").default(1).notNull(),
	eventName: varchar("event_name", { length: 50 }),
	visitId: uuid("visit_id").notNull(),
	tag: varchar({ length: 50 }),
}, (table) => [
	index("website_event_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("website_event_session_id_idx").using("btree", table.sessionId.asc().nullsLast().op("uuid_ops")),
	index("website_event_visit_id_idx").using("btree", table.visitId.asc().nullsLast().op("uuid_ops")),
	index("website_event_website_id_created_at_event_name_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("text_ops"), table.eventName.asc().nullsLast().op("timestamptz_ops")),
	index("website_event_website_id_created_at_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("uuid_ops")),
	index("website_event_website_id_created_at_page_title_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("text_ops"), table.pageTitle.asc().nullsLast().op("text_ops")),
	index("website_event_website_id_created_at_referrer_domain_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("text_ops"), table.referrerDomain.asc().nullsLast().op("text_ops")),
	index("website_event_website_id_created_at_tag_idx").using("btree", table.websiteId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.asc().nullsLast().op("text_ops"), table.tag.asc().nullsLast().op("uuid_ops")),
	index("website_event_website_id_created_at_url_path_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("text_ops"), table.urlPath.asc().nullsLast().op("uuid_ops")),
	index("website_event_website_id_created_at_url_query_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops"), table.urlQuery.asc().nullsLast().op("timestamptz_ops")),
	index("website_event_website_id_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops")),
	index("website_event_website_id_session_id_created_at_idx").using("btree", table.websiteId.asc().nullsLast().op("timestamptz_ops"), table.sessionId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.asc().nullsLast().op("uuid_ops")),
	index("website_event_website_id_visit_id_created_at_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.visitId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops")),
]);

export const website = pgTable("website", {
	websiteId: uuid("website_id").primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	domain: varchar({ length: 500 }),
	shareId: varchar("share_id", { length: 50 }),
	resetAt: timestamp("reset_at", { precision: 6, withTimezone: true, mode: 'date' }),
	userId: uuid("user_id"),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'date' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true, mode: 'date' }),
	deletedAt: timestamp("deleted_at", { precision: 6, withTimezone: true, mode: 'date' }),
	createdBy: uuid("created_by"),
	teamId: uuid("team_id"),
}, (table) => [
	index("website_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("website_created_by_idx").using("btree", table.createdBy.asc().nullsLast().op("uuid_ops")),
	index("website_share_id_idx").using("btree", table.shareId.asc().nullsLast().op("text_ops")),
	uniqueIndex("website_share_id_key").using("btree", table.shareId.asc().nullsLast().op("text_ops")),
	index("website_team_id_idx").using("btree", table.teamId.asc().nullsLast().op("uuid_ops")),
	index("website_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("website_website_id_key").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops")),
]);
