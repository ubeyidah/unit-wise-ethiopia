import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// interface ImportMetaEnv {
//   readonly VITE_API_KEY: string;
//   readonly VITE_AUTH_DOMAIN: string;
//   readonly VITE_PROJECT_ID: string;
//   readonly VITE_STORAGE_BUCKET: string;
//   readonly VITE_MESSAGING_SENDER_ID: string;
//   readonly VITE_APP_ID: string;
//   // Add other environment variables here...
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY!,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID!,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID!,
  appId: import.meta.env.VITE_FIREBASE_APP_ID!,
};

const app = initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage(app);

export { storage };
