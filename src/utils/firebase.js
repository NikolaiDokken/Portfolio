import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD2s1-b3-eSS8_LVlmZ-cm35Me1Y5_OhnE",
    authDomain: "nikolai-dokken-portfolio.firebaseapp.com",
    projectId: "nikolai-dokken-portfolio",
    storageBucket: "gs://nikolai-dokken-portfolio.appspot.com",
    messagingSenderId: "615463223435",
    appId: "1:615463223435:web:4a53e400266e39900c948e",
};

// Init firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Init firestore service
const auth = getAuth();
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithRedirect(auth, provider);
export const signOutFromApp = () => signOut(auth);

const storage = getStorage(firebaseApp);
export default getFirestore();
export { auth, storage };
