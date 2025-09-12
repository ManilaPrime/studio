'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import type { Unit } from '@/lib/types';
import { callApi } from './utils';

const unitsCollection = collection(db, 'units');

export async function getUnits(): Promise<Unit[]> {
    const snapshot = await getDocs(unitsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Unit));
}

export async function getUnit(unitId: string): Promise<Unit | null> {
    const unitDoc = doc(db, 'units', unitId);
    const snapshot = await getDoc(unitDoc);
    if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() } as Unit;
    }
    return null;
}

export async function addUnit(unitData: Omit<Unit, 'id'>): Promise<string> {
    const docRef = await addDoc(unitsCollection, unitData);
    return docRef.id;
}

export async function updateUnit(unitData: Unit): Promise<void> {
    const { id, ...data } = unitData;
    if (!id) throw new Error("Unit ID is required for update");
    const unitDoc = doc(db, 'units', id);
    await updateDoc(unitDoc, data);
}

export async function deleteUnit(unitId: string): Promise<void> {
    const unitDoc = doc(db, 'units', unitId);
    await deleteDoc(unitDoc);
}
