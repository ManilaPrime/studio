'use client';

import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Agent } from '@/lib/types';
import { callApi } from './utils';

const agentsCollection = collection(db, 'agents');

export async function getAgents(): Promise<Agent[]> {
    const snapshot = await getDocs(agentsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Agent));
}

export async function addAgent(agentData: Omit<Agent, 'id'>): Promise<string> {
    const docRef = await addDoc(agentsCollection, agentData);
    return docRef.id;
}

export async function updateAgent(agentData: Agent): Promise<void> {
    const { id, ...data } = agentData;
    if (!id) throw new Error("Agent ID is required for update");
    const agentDoc = doc(db, 'agents', id);
    await updateDoc(agentDoc, data);
}

export async function deleteAgent(agentId: string): Promise<void> {
    const agentDoc = doc(db, 'agents', agentId);
    await deleteDoc(agentDoc);
}
