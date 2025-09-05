'use server';

import { CalendarService } from '@/services/calendar';
import type { Platform, SyncedEvent, Unit } from '@/lib/types';

export async function syncCalendars(unitCalendars: Unit['calendars']): Promise<SyncedEvent[]> {
  const platforms: Platform[] = ['Airbnb', 'Booking.com', 'Direct'];
  const calendarPromises = platforms.map(async (platform) => {
    const calendarKey = platform.toLowerCase().replace('.com', '') as keyof typeof unitCalendars;
    const url = unitCalendars[calendarKey];
    if (url && !url.includes('example.com')) { // Do not fetch example URLs
      try {
        const events = await CalendarService.fetchAndParseCalendar(url);
        return events.map((event) => ({ ...event, platform }));
      } catch (error) {
        console.error(`Failed to fetch or parse calendar for ${platform}:`, error);
        return [];
      }
    }
    return [];
  });

  const allEventsNested = await Promise.all(calendarPromises);
  const allEvents = allEventsNested.flat();

  // Sort events by start date
  allEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return allEvents;
}
