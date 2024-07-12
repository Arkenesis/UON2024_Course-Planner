import dotenv from 'dotenv'
import { initializeApp } from "firebase/app";
dotenv.config({ path: './secret/.env' });

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
};

export const app = initializeApp(firebaseConfig);