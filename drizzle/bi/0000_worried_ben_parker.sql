-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

CREATE TABLE "UserLoginInfo" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" uuid NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"daily_used_at" timestamp(6) with time zone NOT NULL,
	CONSTRAINT "UserLoginInfo_event_id_unique" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE TABLE "UserSignUpInfo" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" uuid NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"sign_up_at" timestamp(6) with time zone NOT NULL,
	CONSTRAINT "UserSignUpInfo_event_id_unique" UNIQUE("event_id")
);
--> statement-breakpoint
CREATE INDEX "UserLoginInfo_daily_used_at_idx" ON "UserLoginInfo" USING btree ("daily_used_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "UserLoginInfo_user_id_idx" ON "UserLoginInfo" USING btree ("user_id" text_ops);--> statement-breakpoint
CREATE INDEX "UserSignUpInfo_sign_up_at_idx" ON "UserSignUpInfo" USING btree ("sign_up_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "UserSignUpInfo_user_id_idx" ON "UserSignUpInfo" USING btree ("user_id" text_ops);
