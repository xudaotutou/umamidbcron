-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "session" (
	"session_id" uuid PRIMARY KEY NOT NULL,
	"website_id" uuid NOT NULL,
	"hostname" varchar(100),
	"browser" varchar(20),
	"os" varchar(20),
	"device" varchar(20),
	"screen" varchar(11),
	"language" varchar(35),
	"country" char(2),
	"subdivision1" varchar(20),
	"subdivision2" varchar(50),
	"city" varchar(50),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "event_data" (
	"event_data_id" uuid PRIMARY KEY NOT NULL,
	"website_id" uuid NOT NULL,
	"website_event_id" uuid NOT NULL,
	"data_key" varchar(500) NOT NULL,
	"string_value" varchar(500),
	"number_value" numeric(19, 4),
	"date_value" timestamp(6) with time zone,
	"data_type" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "team_user" (
	"team_user_id" uuid PRIMARY KEY NOT NULL,
	"team_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" varchar(50) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "website_event" (
	"event_id" uuid PRIMARY KEY NOT NULL,
	"website_id" uuid NOT NULL,
	"session_id" uuid NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
	"url_path" varchar(500) NOT NULL,
	"url_query" varchar(500),
	"referrer_path" varchar(500),
	"referrer_query" varchar(500),
	"referrer_domain" varchar(500),
	"page_title" varchar(500),
	"event_type" integer DEFAULT 1 NOT NULL,
	"event_name" varchar(50),
	"visit_id" uuid NOT NULL,
	"tag" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "team" (
	"team_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"access_code" varchar(50),
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(6) with time zone,
	"deleted_at" timestamp(6) with time zone,
	"logo_url" varchar(2183)
);
--> statement-breakpoint
CREATE TABLE "session_data" (
	"session_data_id" uuid PRIMARY KEY NOT NULL,
	"website_id" uuid NOT NULL,
	"session_id" uuid NOT NULL,
	"data_key" varchar(500) NOT NULL,
	"string_value" varchar(500),
	"number_value" numeric(19, 4),
	"date_value" timestamp(6) with time zone,
	"data_type" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "report" (
	"report_id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"website_id" uuid NOT NULL,
	"type" varchar(200) NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" varchar(500) NOT NULL,
	"parameters" varchar(6000) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(6) with time zone
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(60) NOT NULL,
	"role" varchar(50) NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(6) with time zone,
	"deleted_at" timestamp(6) with time zone,
	"display_name" varchar(255),
	"logo_url" varchar(2183)
);
--> statement-breakpoint
CREATE TABLE "website" (
	"website_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"domain" varchar(500),
	"share_id" varchar(50),
	"reset_at" timestamp(6) with time zone,
	"user_id" uuid,
	"created_at" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp(6) with time zone,
	"deleted_at" timestamp(6) with time zone,
	"created_by" uuid,
	"team_id" uuid
);
--> statement-breakpoint
CREATE INDEX "session_created_at_idx" ON "session" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "session_session_id_key" ON "session" USING btree ("session_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_browser_idx" ON "session" USING btree ("website_id" text_ops,"created_at" uuid_ops,"browser" text_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_city_idx" ON "session" USING btree ("website_id" uuid_ops,"created_at" text_ops,"city" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_country_idx" ON "session" USING btree ("website_id" bpchar_ops,"created_at" bpchar_ops,"country" uuid_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_device_idx" ON "session" USING btree ("website_id" timestamptz_ops,"created_at" timestamptz_ops,"device" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_hostname_idx" ON "session" USING btree ("website_id" text_ops,"created_at" uuid_ops,"hostname" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_idx" ON "session" USING btree ("website_id" timestamptz_ops,"created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_language_idx" ON "session" USING btree ("website_id" timestamptz_ops,"created_at" timestamptz_ops,"language" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_os_idx" ON "session" USING btree ("website_id" text_ops,"created_at" timestamptz_ops,"os" uuid_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_screen_idx" ON "session" USING btree ("website_id" uuid_ops,"created_at" text_ops,"screen" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_created_at_subdivision1_idx" ON "session" USING btree ("website_id" timestamptz_ops,"created_at" uuid_ops,"subdivision1" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_website_id_idx" ON "session" USING btree ("website_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "event_data_created_at_idx" ON "event_data" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "event_data_website_event_id_idx" ON "event_data" USING btree ("website_event_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "event_data_website_id_created_at_data_key_idx" ON "event_data" USING btree ("website_id" text_ops,"created_at" timestamptz_ops,"data_key" text_ops);--> statement-breakpoint
CREATE INDEX "event_data_website_id_created_at_idx" ON "event_data" USING btree ("website_id" uuid_ops,"created_at" uuid_ops);--> statement-breakpoint
CREATE INDEX "event_data_website_id_idx" ON "event_data" USING btree ("website_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "team_user_team_id_idx" ON "team_user" USING btree ("team_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "team_user_team_user_id_key" ON "team_user" USING btree ("team_user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "team_user_user_id_idx" ON "team_user" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_created_at_idx" ON "website_event" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "website_event_session_id_idx" ON "website_event" USING btree ("session_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_visit_id_idx" ON "website_event" USING btree ("visit_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_created_at_event_name_idx" ON "website_event" USING btree ("website_id" uuid_ops,"created_at" text_ops,"event_name" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_created_at_idx" ON "website_event" USING btree ("website_id" uuid_ops,"created_at" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_created_at_page_title_idx" ON "website_event" USING btree ("website_id" text_ops,"created_at" text_ops,"page_title" text_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_created_at_referrer_domain_idx" ON "website_event" USING btree ("website_id" uuid_ops,"created_at" text_ops,"referrer_domain" text_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_created_at_tag_idx" ON "website_event" USING btree ("website_id" timestamptz_ops,"created_at" text_ops,"tag" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_created_at_url_path_idx" ON "website_event" USING btree ("website_id" text_ops,"created_at" text_ops,"url_path" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_created_at_url_query_idx" ON "website_event" USING btree ("website_id" text_ops,"created_at" timestamptz_ops,"url_query" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_idx" ON "website_event" USING btree ("website_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_session_id_created_at_idx" ON "website_event" USING btree ("website_id" timestamptz_ops,"session_id" timestamptz_ops,"created_at" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_event_website_id_visit_id_created_at_idx" ON "website_event" USING btree ("website_id" uuid_ops,"visit_id" uuid_ops,"created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "team_access_code_idx" ON "team" USING btree ("access_code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "team_access_code_key" ON "team" USING btree ("access_code" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "team_team_id_key" ON "team" USING btree ("team_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "session_data_created_at_idx" ON "session_data" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_data_session_id_created_at_idx" ON "session_data" USING btree ("session_id" timestamptz_ops,"created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "session_data_session_id_idx" ON "session_data" USING btree ("session_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "session_data_website_id_created_at_data_key_idx" ON "session_data" USING btree ("website_id" text_ops,"created_at" uuid_ops,"data_key" uuid_ops);--> statement-breakpoint
CREATE INDEX "session_data_website_id_idx" ON "session_data" USING btree ("website_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "report_name_idx" ON "report" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "report_report_id_key" ON "report" USING btree ("report_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "report_type_idx" ON "report" USING btree ("type" text_ops);--> statement-breakpoint
CREATE INDEX "report_user_id_idx" ON "report" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "report_website_id_idx" ON "report" USING btree ("website_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "user_user_id_key" ON "user" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "user_username_key" ON "user" USING btree ("username" text_ops);--> statement-breakpoint
CREATE INDEX "website_created_at_idx" ON "website" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "website_created_by_idx" ON "website" USING btree ("created_by" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_share_id_idx" ON "website" USING btree ("share_id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "website_share_id_key" ON "website" USING btree ("share_id" text_ops);--> statement-breakpoint
CREATE INDEX "website_team_id_idx" ON "website" USING btree ("team_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "website_user_id_idx" ON "website" USING btree ("user_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "website_website_id_key" ON "website" USING btree ("website_id" uuid_ops);
*/