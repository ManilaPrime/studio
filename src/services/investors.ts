'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Investor } from '@/lib/types';
import { callApi } from './utils';

const investorsCollection = collection(db, 'investors');

export async function getInvestors(): Promise<Investor[]> {
    const snapshot = await getDocs(investorsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Investor));
}

export async function addInvestor(investorData: Omit<Investor, 'id'>): Promise<string> {
    const docRef = await addDoc(investorsCollection, investorData);
    return docRef.id;
}

export async function updateInvestor(investorData: Investor): Promise<void> {
    const { id, ...data } = investorData;
    if (!id) throw new Error("Investor ID is required for update");
    const investorDoc = doc(db, 'investors', id);
    await updateDoc(investorDoc, data);
}

export async function deleteInvestor(investorId: string): Promise<void> {
    const investorDoc = doc(db, 'investors', investorId);
    await deleteDoc(investorDoc);
}
