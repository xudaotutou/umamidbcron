
import { index, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// "UserLoginInfo"
export const UserLoginInfo = pgTable("UserLoginInfo", {
    id: serial("id").primaryKey(),
    eventId: uuid("event_id").notNull().unique(),
    userId: varchar("user_id",{ length: 255}).notNull(),
    domain: text("domain").notNull(),
    dailyUsedAt: timestamp("daily_used_at", { precision: 6, withTimezone: true, mode: 'date' }).notNull(),
}, (table) => [
  index("UserLoginInfo_daily_used_at_idx").on(table.dailyUsedAt),
  index("UserLoginInfo_user_id_idx").on(table.userId)
]);

// "UserSignUpInfo"
export const UserSignUpInfo = pgTable("UserSignUpInfo", {
    id: serial("id").primaryKey(),
    eventId: uuid("event_id").notNull().unique(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    domain: text("domain").notNull(),
    signUpAt: timestamp("sign_up_at", { precision: 6, withTimezone: true, mode: 'date' }).notNull(),
}, (table) => [
    index("UserSignUpInfo_sign_up_at_idx").on(table.signUpAt),
    index("UserSignUpInfo_user_id_idx").on(table.userId),
]);