'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Booking } from '@/lib/types';

const bookingsCollection = collection(db, 'bookings');

export async function getBookings(): Promise<Booking[]> {
    const snapshot = await getDocs(bookingsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
}

export async function addBooking(bookingData: Omit<Booking, 'id'>): Promise<string> {
    const docRef = await addDoc(bookingsCollection, bookingData);
    // Here you would also trigger the sync and discord notification
    return docRef.id;
}

export async function deleteBooking(bookingId: string): Promise<void> {
    const bookingDoc = doc(db, 'bookings', bookingId);
    await deleteDoc(bookingDoc);
}
