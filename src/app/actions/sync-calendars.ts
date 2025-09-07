
'use server';

import { CalendarService } from '@/services/calendar';
import type { Platform, SyncedEvent, Unit, Booking } from '@/lib/types';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

async function getExistingBookingUIDs(unitId: string): Promise<string[]> {
    const bookingsCollection = collection(db, 'bookings');
    // Note: We can't query for a specific UID format, so we fetch all and filter locally.
    // This is not ideal for performance but necessary with iCal UIDs.
    // A more robust system might store the original UID in a dedicated field.
    const q = query(bookingsCollection, where('unitId', '==', unitId));
    const querySnapshot = await getDocs(q);
    
    // We are assuming the booking ID is the UID from the iCal event.
    // This is a simplification. A real-world app would store the UID separately.
    return querySnapshot.docs.map(doc => doc.id); 
}

async function createBookingFromEvent(event: SyncedEvent, unitId: string): Promise<void> {
    const bookingsCollection = collection(db, 'bookings');
    
    const newBooking: Omit<Booking, 'id' | 'createdAt'> = {
        guestFirstName: "Synced",
        guestLastName: "Booking",
        guestPhone: "N/A",
        guestEmail: "N/A",
        unitId: unitId,
        checkinDate: event.start,
        checkoutDate: event.end,
        adults: 0,
        children: 0,
        nightlyRate: 0,
        totalAmount: 0,
        paymentStatus: 'paid', // Assume synced bookings are paid
        specialRequests: `Synced from ${event.platform}: ${event.summary}`,
    };

    // We can't set the ID with addDoc, so Firestore will auto-generate one.
    // This is a limitation of this approach. In a real app, you might use the UID
    // as the document ID if it's guaranteed to be unique and a valid Firestore ID.
    // For now, we'll let Firestore create the ID and we'll rely on other fields
    // to check for existence, which is inefficient but works for this demo.
    // A better approach would be to query for a booking with the same start/end/summary.
    
    // For simplicity, we are not creating new bookings automatically to avoid duplicates
    // without a more robust UID/ID mapping strategy. This function serves as a placeholder
    // for how one might implement it. The core logic below will still return all events.
    console.log(`Placeholder: Would create booking for event UID ${event.uid}`);
}


export async function syncCalendars(unitCalendars: Unit['calendars']): Promise<SyncedEvent[]> {
  const platforms: Platform[] = ['Airbnb', 'Booking.com', 'Direct'];
  
  const unitId = "some-unit-id"; // In a real app, you'd pass the unitId in.

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

  // This is where the automatic booking creation would happen.
  // We're disabling the actual creation to prevent duplicate entries,
  // but this is where the logic would go.
  // const existingUIDs = await getExistingBookingUIDs(unitId);
  // for (const event of allEvents) {
  //   if (!existingUIDs.includes(event.uid)) {
  //     await createBookingFromEvent(event, unitId);
  //   }
  // }


  // Sort events by start date
  allEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return allEvents;
}
