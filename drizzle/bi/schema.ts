import { pgTable, index, unique, serial, uuid, varchar, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const userLoginInfo = pgTable("UserLoginInfo", {
	id: serial().primaryKey().notNull(),
	eventId: uuid("event_id").notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	dailyUsedAt: timestamp("daily_used_at", { precision: 6, withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	index("UserLoginInfo_daily_used_at_idx").using("btree", table.dailyUsedAt.asc().nullsLast().op("timestamptz_ops")),
	index("UserLoginInfo_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	unique("UserLoginInfo_event_id_unique").on(table.eventId),
]);

export const userSignUpInfo = pgTable("UserSignUpInfo", {
	id: serial().primaryKey().notNull(),
	eventId: uuid("event_id").notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	signUpAt: timestamp("sign_up_at", { precision: 6, withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	index("UserSignUpInfo_sign_up_at_idx").using("btree", table.signUpAt.asc().nullsLast().op("timestamptz_ops")),
	index("UserSignUpInfo_user_id_idx").using("btree", table.userId.asc().nullsLast().op("text_ops")),
	unique("UserSignUpInfo_event_id_unique").on(table.eventId),
]);
