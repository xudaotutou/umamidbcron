import { startOfToday, startOfYesterday } from 'date-fns';
import 'dotenv/config';
import { and, asc, between, eq, isNotNull } from 'drizzle-orm';
import { db } from './db';
import { eventData, websiteEvent } from './db/schema';

// 提取公共查询条件
const getCommonQueryConditions = () => and(
  eq(eventData.dataKey, 'userUid'),
  isNotNull(eventData.stringValue),
  between(eventData.createdAt, startOfYesterday(), startOfToday())
);

// 提取公共查询结构
const getEventListQuery = (eventName: string) => db
  .selectDistinctOn([eventData.stringValue], {
    eventData: eventData.eventDataId,
    userUid: eventData.stringValue,
    createdAt: websiteEvent.createdAt,
  })
  .from(eventData)
  .innerJoin(
    db
      .select({
        eventId: websiteEvent.eventId,
        createdAt: websiteEvent.createdAt,
        eventName: websiteEvent.eventName
      })
      .from(websiteEvent)
      .where(
        and(
          between(websiteEvent.createdAt, startOfYesterday(), startOfToday()),
          eq(websiteEvent.eventType, 2)
        )
      )
      .as('dailyEvent'),
    and(
      eq(eventData.websiteEventId, websiteEvent.eventId),
      eq(websiteEvent.eventName, eventName)
    )
  )
  .where(getCommonQueryConditions())
  .orderBy(asc(websiteEvent.createdAt));

async function main() {
  try {
    const [dailyLoginList, signUpList] = await db.transaction(async tx => {
      const dailyLoginQuery = getEventListQuery('dailyLoginFirst');
      const signUpQuery = getEventListQuery('signUp');
      
      return Promise.all([
        dailyLoginQuery.execute(),
        signUpQuery.execute()
      ]);
    });

    console.log('Daily login:', dailyLoginList);
    console.log('Daily signup:', signUpList);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();