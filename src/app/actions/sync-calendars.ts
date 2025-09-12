
'use server';

import type { Platform, SyncedEvent, Unit, Booking } from '@/lib/types';
import { collection, query, where, getDocs, addDoc, documentId } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getUnit } from '@/services/units';
import { sendDiscordNotification } from '@/services/discord';
import { callApi } from '@/services/utils';
import { CalendarService } from '@/services/calendar';


async function getExistingBookingUIDs(unitId: string, uidsToFetch: string[]): Promise<string[]> {
    if (uidsToFetch.length === 0) {
        return [];
    }

    const bookingsCollection = collection(db, 'bookings');
    // Firestore allows 'in' queries with up to 30 values.
    // If we have more, we need to batch the requests.
    const batches: string[][] = [];
    for (let i = 0; i < uidsToFetch.length; i += 30) {
        batches.push(uidsToFetch.slice(i, i + 30));
    }

    const existingUIDs = new Set<string>();

    for (const batch of batches) {
        const q = query(
            bookingsCollection,
            where('unitId', '==', unitId),
            where('uid', 'in', batch)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const booking = doc.data() as Booking;
            if (booking.uid) {
                existingUIDs.add(booking.uid);
            }
        });
    }
    
    return Array.from(existingUIDs);
}

async function createBookingFromEvent(event: SyncedEvent, unit: Unit): Promise<void> {
    const bookingsCollection = collection(db, 'bookings');
    
    const newBookingData: Omit<Booking, 'id' | 'createdAt'> = {
        uid: event.uid,
        guestFirstName: "Synced",
        guestLastName: event.platform,
        guestPhone: "N/A",
        guestEmail: "N/A",
        unitId: unit.id!,
        checkinDate: event.start,
        checkoutDate: event.end,
        adults: 0,
        children: 0,
        nightlyRate: unit.rate,
        totalAmount: 0, // Total amount is unknown from iCal
        paymentStatus: 'paid', // Assume synced bookings are paid
        specialRequests: `Synced from ${event.platform}: ${event.summary}`,
    };

    const docRef = await addDoc(bookingsCollection, {
        ...newBookingData,
        createdAt: new Date().toISOString()
    });

    try {
        await sendDiscordNotification({ ...newBookingData, id: docRef.id, createdAt: new Date().toISOString() }, unit);
    } catch(error) {
        console.error("Failed to send Discord notification for synced event:", error);
    }
}


export async function syncCalendars(unitCalendars: Unit['calendars'], unitId: string): Promise<SyncedEvent[]> {
  const result = await callApi('sync-calendars', { unitCalendars, unitId });
  
  if (result.newEvents) {
      const unit = await getUnit(unitId);
      if(unit) {
          for (const event of result.newEvents) {
              await createBookingFromEvent(event, unit);
          }
      }
  }
  
  return result.allEvents;
}
