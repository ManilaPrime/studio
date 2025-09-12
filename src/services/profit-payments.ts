'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import type { ProfitPayment } from '@/lib/types';
import { callApi } from './utils';

const paymentsCollection = collection(db, 'profitPayments');

export async function getProfitPayments(): Promise<ProfitPayment[]> {
    const snapshot = await getDocs(paymentsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProfitPayment));
}

export async function addProfitPayment(paymentData: Omit<ProfitPayment, 'id'>): Promise<string> {
    const docRef = await addDoc(paymentsCollection, paymentData);
    return docRef.id;
}
