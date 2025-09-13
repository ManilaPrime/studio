
import ical from 'node-ical';
import type { SyncedEvent } from '@/lib/types';

export class CalendarService {
  static async fetchAndParseCalendar(url: string): Promise<Omit<SyncedEvent, 'platform'>[]> {
    try {
      const events = await ical.async.fromURL(url);
      const parsedEvents: Omit<SyncedEvent, 'platform'>[] = [];

      for (const key in events) {
        if (events[key].type === 'VEVENT') {
          const event = events[key] as ical.VEvent;
          if (event.summary && event.start && event.end) {
             parsedEvents.push({
              uid: event.uid || key,
              summary: typeof event.summary === 'string' ? event.summary : event.summary.val,
              start: event.start.toISOString(),
              end: event.end.toISOString(),
            });
          }
        }
      }
      return parsedEvents;
    } catch (error) {
      console.error('Error fetching or parsing iCal data:', error);
      // Don't throw an error for a single failed calendar, just return empty
      return [];
    }
  }
}
