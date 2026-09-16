import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6D6HyUQAZ2boQWkOqPuVAOrKZqkUC0xQ",
  authDomain: "ktct-web-project.firebaseapp.com",
  projectId: "ktct-web-project",
  storageBucket: "ktct-web-project.firebasestorage.app",
  messagingSenderId: "653028011619",
  appId: "1:653028011619:web:d05f84012e2a6af40c5256",
  measurementId: "G-MLH2PP2S4D"
};

let app;
let db: any = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error", error);
}

export { db };
