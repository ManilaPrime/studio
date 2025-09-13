
'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import type { Booking, Unit } from '@/lib/types';
import { getUnit } from './units';
import { callApi } from './utils';


const bookingsCollection = collection(db, 'bookings');

export async function getBookings(): Promise<Booking[]> {
    const snapshot = await getDocs(bookingsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
}

export async function addBooking(bookingData: Omit<Booking, 'id'>): Promise<string> {
    const docRef = await addDoc(bookingsCollection, bookingData);
    
    // After successful booking, send a notification via the Vercel backend
    try {
        const unit = await getUnit(bookingData.unitId);
        if (unit) {
            // This is a fire-and-forget call to the backend.
            await callApi('discord-notification', { booking: { ...bookingData, id: docRef.id, createdAt: new Date().toISOString() }, unit });
        }
    } catch (error) {
        console.error("Failed to send Discord notification via backend:", error);
        // We don't re-throw the error because the booking itself was successful.
    }

    return docRef.id;
}

export async function updateBooking(bookingData: Booking): Promise<void> {
    const { id, ...data } = bookingData;
    if (!id) throw new Error("Booking ID is required for update");
    const bookingDoc = doc(db, 'bookings', id);
    await updateDoc(bookingDoc, data);
}

export async function deleteBooking(bookingId: string): Promise<void> {
    const bookingDoc = doc(db, 'bookings', bookingId);
    await deleteDoc(bookingDoc);
}
