'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Reminder } from '@/lib/types';

const remindersCollection = collection(db, 'reminders');

export async function getReminders(): Promise<Reminder[]> {
    const snapshot = await getDocs(remindersCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reminder));
}

export async function addReminder(reminderData: Omit<Reminder, 'id'>): Promise<string> {
    const docRef = await addDoc(remindersCollection, reminderData);
    return docRef.id;
}

export async function updateReminder(reminderData: Reminder): Promise<void> {
    const { id, ...data } = reminderData;
    if (!id) throw new Error("Reminder ID is required for update");
    const reminderDoc = doc(db, 'reminders', id);
    await updateDoc(reminderDoc, data);
}

export async function deleteReminder(reminderId: string): Promise<void> {
    const reminderDoc = doc(db, 'reminders', reminderId);
    await deleteDoc(reminderDoc);
}
