// model/database.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import { readFile } from 'fs/promises';

const initializeFirestore = async () => {
  const serviceAccountPath = new URL('../secret/courseplanner-192be-firebase-adminsdk-ekqot-13b430878e.json', import.meta.url);
  const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf8'));
  initializeApp({credential: cert(serviceAccount)});
  return getFirestore();
};

export const db = await initializeFirestore();