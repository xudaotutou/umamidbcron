import { pgTable, index, uniqueIndex, uuid, varchar, char, timestamp, numeric, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const session = pgTable("session", {
	sessionId: uuid("session_id").primaryKey().notNull(),
	websiteId: uuid("website_id").notNull(),
	hostname: varchar({ length: 100 }),
	browser: varchar({ length: 20 }),
	os: varchar({ length: 20 }),
	device: varchar({ length: 20 }),
	screen: varchar({ length: 11 }),
	language: varchar({ length: 35 }),
	country: char({ length: 2 }),
	subdivision1: varchar({ length: 20 }),
	subdivision2: varchar({ length: 50 }),
	city: varchar({ length: 50 }),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("session_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	uniqueIndex("session_session_id_key").using("btree", table.sessionId.asc().nullsLast().op("uuid_ops")),
	index("session_website_id_created_at_browser_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("uuid_ops"), table.browser.asc().nullsLast().op("text_ops")),
	index("session_website_id_created_at_city_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("text_ops"), table.city.asc().nullsLast().op("timestamptz_ops")),
	index("session_website_id_created_at_country_idx").using("btree", table.websiteId.asc().nullsLast().op("bpchar_ops"), table.createdAt.asc().nullsLast().op("bpchar_ops"), table.country.asc().nullsLast().op("uuid_ops")),
	index("session_website_id_created_at_device_idx").using("btree", table.websiteId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops"), table.device.asc().nullsLast().op("timestamptz_ops")),
	index("session_website_id_created_at_hostname_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("uuid_ops"), table.hostname.asc().nullsLast().op("timestamptz_ops")),
	index("session_website_id_created_at_idx").using("btree", table.websiteId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("session_website_id_created_at_language_idx").using("btree", table.websiteId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops"), table.language.asc().nullsLast().op("timestamptz_ops")),
	index("session_website_id_created_at_os_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops"), table.os.asc().nullsLast().op("uuid_ops")),
	index("session_website_id_created_at_screen_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("text_ops"), table.screen.asc().nullsLast().op("timestamptz_ops")),
	index("session_website_id_created_at_subdivision1_idx").using("btree", table.websiteId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.asc().nullsLast().op("uuid_ops"), table.subdivision1.asc().nullsLast().op("timestamptz_ops")),
	index("session_website_id_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops")),
]);

export const eventData = pgTable("event_data", {
	eventDataId: uuid("event_data_id").primaryKey().notNull(),
	websiteId: uuid("website_id").notNull(),
	websiteEventId: uuid("website_event_id").notNull(),
	dataKey: varchar("data_key", { length: 500 }).notNull(),
	stringValue: varchar("string_value", { length: 500 }),
	numberValue: numeric("number_value", { precision: 19, scale:  4 }),
	dateValue: timestamp("date_value", { precision: 6, withTimezone: true, mode: 'string' }),
	dataType: integer("data_type").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("event_data_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("event_data_website_event_id_idx").using("btree", table.websiteEventId.asc().nullsLast().op("uuid_ops")),
	index("event_data_website_id_created_at_data_key_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops"), table.dataKey.asc().nullsLast().op("text_ops")),
	index("event_data_website_id_created_at_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops"), table.createdAt.asc().nullsLast().op("uuid_ops")),
	index("event_data_website_id_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops")),
]);

export const teamUser = pgTable("team_user", {
	teamUserId: uuid("team_user_id").primaryKey().notNull(),
	teamId: uuid("team_id").notNull(),
	userId: uuid("user_id").notNull(),
	role: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true, mode: 'string' }),
}, (table) => [
	index("team_user_team_id_idx").using("btree", table.teamId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("team_user_team_user_id_key").using("btree", table.teamUserId.asc().nullsLast().op("uuid_ops")),
	index("team_user_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
]);

export const websiteEvent = pgTable("website_event", {
	eventId: uuid("event_id").primaryKey().notNull(),
	websiteId: uuid("website_id").notNull(),
	sessionId: uuid("session_id").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
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

export const team = pgTable("team", {
	teamId: uuid("team_id").primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	accessCode: varchar("access_code", { length: 50 }),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { precision: 6, withTimezone: true, mode: 'string' }),
	logoUrl: varchar("logo_url", { length: 2183 }),
}, (table) => [
	index("team_access_code_idx").using("btree", table.accessCode.asc().nullsLast().op("text_ops")),
	uniqueIndex("team_access_code_key").using("btree", table.accessCode.asc().nullsLast().op("text_ops")),
	uniqueIndex("team_team_id_key").using("btree", table.teamId.asc().nullsLast().op("uuid_ops")),
]);

export const sessionData = pgTable("session_data", {
	sessionDataId: uuid("session_data_id").primaryKey().notNull(),
	websiteId: uuid("website_id").notNull(),
	sessionId: uuid("session_id").notNull(),
	dataKey: varchar("data_key", { length: 500 }).notNull(),
	stringValue: varchar("string_value", { length: 500 }),
	numberValue: numeric("number_value", { precision: 19, scale:  4 }),
	dateValue: timestamp("date_value", { precision: 6, withTimezone: true, mode: 'string' }),
	dataType: integer("data_type").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
	index("session_data_created_at_idx").using("btree", table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("session_data_session_id_created_at_idx").using("btree", table.sessionId.asc().nullsLast().op("timestamptz_ops"), table.createdAt.asc().nullsLast().op("timestamptz_ops")),
	index("session_data_session_id_idx").using("btree", table.sessionId.asc().nullsLast().op("uuid_ops")),
	index("session_data_website_id_created_at_data_key_idx").using("btree", table.websiteId.asc().nullsLast().op("text_ops"), table.createdAt.asc().nullsLast().op("uuid_ops"), table.dataKey.asc().nullsLast().op("uuid_ops")),
	index("session_data_website_id_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops")),
]);

export const report = pgTable("report", {
	reportId: uuid("report_id").primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	websiteId: uuid("website_id").notNull(),
	type: varchar({ length: 200 }).notNull(),
	name: varchar({ length: 200 }).notNull(),
	description: varchar({ length: 500 }).notNull(),
	parameters: varchar({ length: 6000 }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true, mode: 'string' }),
}, (table) => [
	index("report_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("report_report_id_key").using("btree", table.reportId.asc().nullsLast().op("uuid_ops")),
	index("report_type_idx").using("btree", table.type.asc().nullsLast().op("text_ops")),
	index("report_user_id_idx").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	index("report_website_id_idx").using("btree", table.websiteId.asc().nullsLast().op("uuid_ops")),
]);

export const user = pgTable("user", {
	userId: uuid("user_id").primaryKey().notNull(),
	username: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 60 }).notNull(),
	role: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { precision: 6, withTimezone: true, mode: 'string' }),
	displayName: varchar("display_name", { length: 255 }),
	logoUrl: varchar("logo_url", { length: 2183 }),
}, (table) => [
	uniqueIndex("user_user_id_key").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	uniqueIndex("user_username_key").using("btree", table.username.asc().nullsLast().op("text_ops")),
]);

export const website = pgTable("website", {
	websiteId: uuid("website_id").primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	domain: varchar({ length: 500 }),
	shareId: varchar("share_id", { length: 50 }),
	resetAt: timestamp("reset_at", { precision: 6, withTimezone: true, mode: 'string' }),
	userId: uuid("user_id"),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true, mode: 'string' }),
	deletedAt: timestamp("deleted_at", { precision: 6, withTimezone: true, mode: 'string' }),
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
