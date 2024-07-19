import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { readFile } from 'fs/promises';

const initializeFirebase = async () => {
  const serviceAccountPath = new URL('../secret/courseplanner-192be-firebase-adminsdk-ekqot-13b430878e.json', import.meta.url);
  const serviceAccount = JSON.parse(await readFile(serviceAccountPath, 'utf8'));
  
  // Initialize the Firebase app with the service account
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'courseplanner-192be.appspot.com'
  });

  // Get Firestore instance
  const firestore = getFirestore();

  // Get Storage bucket instance
  const storage = getStorage().bucket();

  return { firestore, storage };
};

const { firestore, storage } = await initializeFirebase();

export const db = firestore;
export const image_db = storage;
