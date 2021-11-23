import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    getDoc,
} from "firebase/firestore";
import db from "./firebase";

// Utils
export const handleGet = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
};

export const handleNew = async (collectionName, document) => {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, document);
    return docRef.id;
};

export const handleEdit = async (collectionName, id, document) => {
    const docRef = doc(db, collectionName, id);
    updateDoc(docRef, document);
    return docRef.id;
};

export const handleDelete = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};
