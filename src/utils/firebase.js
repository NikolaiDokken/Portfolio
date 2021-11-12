import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2s1-b3-eSS8_LVlmZ-cm35Me1Y5_OhnE",
  authDomain: "nikolai-dokken-portfolio.firebaseapp.com",
  projectId: "nikolai-dokken-portfolio",
  storageBucket: "nikolai-dokken-portfolio.appspot.com",
  messagingSenderId: "615463223435",
  appId: "1:615463223435:web:4a53e400266e39900c948e",
};

// Init firebase app
initializeApp(firebaseConfig);

// Init firestore service
export default getFirestore();

// Utils
/*
export const handleNew = async () => {
  const name = prompt("Enter color name");
  const value = prompt("Enter color value");

  const collectionRef = collection(db, "colors");
  const payload = { name, value, timestamp: serverTimestamp() };

  const docRef = await addDoc(collectionRef, payload);
  console.log("The new ID is: " + docRef.id);
};
*/
