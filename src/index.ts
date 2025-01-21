import { endOfToday, startOfToday, startOfYesterday } from 'date-fns';
import 'dotenv/config';
import { and, asc, between, eq, inArray, isNotNull } from 'drizzle-orm';
import { db as biDb } from './db/bi';
import { UserLoginInfo, UserSignUpInfo } from './db/bi/schema';
import { db } from './db/umami';
import { eventData, website, websiteEvent } from './db/umami/schema';
const getDailyEvent = () => {
  const websiteIds = process.env.WEBSITE_IDS?.split(',') || []
  return db
  .select({
    eventId: websiteEvent.eventId,
    createdAt: websiteEvent.createdAt,
    eventName: websiteEvent.eventName,
    websiteDomain: website.domain
  })
  .from(websiteEvent)
  .where(
    and(
      between(websiteEvent.createdAt, startOfYesterday(), endOfToday()),
      eq(websiteEvent.eventType, 2),
      inArray(websiteEvent.websiteId, websiteIds)
    )
  )
  .leftJoin(website,
    eq(website.websiteId, websiteEvent.websiteId)
  )
  .as('dailyEvent')}
  
const getCommonQueryConditions = () => and(
  eq(eventData.dataKey, 'userId'),
  isNotNull(eventData.stringValue),
  between(eventData.createdAt, startOfYesterday(), startOfToday()),
);
const getEventListQuery = (eventName: string) => {
  const dailyEventDb = getDailyEvent()
  return db
    .selectDistinctOn([eventData.stringValue], {
      eventData: eventData.eventDataId,
      eventId: eventData.websiteEventId,
      userId: eventData.stringValue,
      createdAt: eventData.createdAt,
      domain: dailyEventDb.websiteDomain
    })
    .from(eventData)
    .innerJoin(
      dailyEventDb,
      and(
        eq(eventData.websiteEventId, dailyEventDb.eventId),
        eq(dailyEventDb.eventName, eventName),
        isNotNull(dailyEventDb.createdAt)
      )
    )
    .where(getCommonQueryConditions())
    .orderBy(asc(eventData.stringValue), asc(eventData.createdAt));
}
async function main() {
  try {
    console.log('start pull')
    const dailyLoginList = await getEventListQuery('dailyLoginFirst');
    const signUpList = await getEventListQuery('signUp');

    console.log('Daily login:', dailyLoginList.length);
    console.log('Daily signup:', signUpList.length);

    // 批量插入登录信息
    if (dailyLoginList.length > 0) {
      const result = await biDb.insert(UserLoginInfo).values(
        dailyLoginList.map(login => ({
          userId: login.userId!,
          eventId: login.eventId,
          dailyUsedAt: login.createdAt!,
          domain: login.domain!
        }))
      ).onConflictDoNothing()
      console.log(result)
    }


    // 批量插入注册信息
    if (signUpList.length > 0) {
      const result = await biDb.insert(UserSignUpInfo).values(
        signUpList.map(signup => ({
          userId: signup.userId!,
          signUpAt: signup.createdAt!,
          eventId: signup.eventId,
          domain: signup.domain!,
        }))
      ).onConflictDoNothing();
      console.log(result)
    }
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();