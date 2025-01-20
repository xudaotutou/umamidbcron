DROP INDEX "UserLoginInfo_daily_used_at_idx";--> statement-breakpoint
DROP INDEX "UserLoginInfo_user_id_idx";--> statement-breakpoint
DROP INDEX "UserSignUpInfo_sign_up_at_idx";--> statement-breakpoint
DROP INDEX "UserSignUpInfo_user_id_idx";--> statement-breakpoint
ALTER TABLE "UserLoginInfo" ADD COLUMN "domain" text NOT NULL;--> statement-breakpoint
ALTER TABLE "UserSignUpInfo" ADD COLUMN "domain" text NOT NULL;--> statement-breakpoint
CREATE INDEX "UserLoginInfo_daily_used_at_idx" ON "UserLoginInfo" USING btree ("daily_used_at");--> statement-breakpoint
CREATE INDEX "UserLoginInfo_user_id_idx" ON "UserLoginInfo" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "UserSignUpInfo_sign_up_at_idx" ON "UserSignUpInfo" USING btree ("sign_up_at");--> statement-breakpoint
CREATE INDEX "UserSignUpInfo_user_id_idx" ON "UserSignUpInfo" USING btree ("user_id");