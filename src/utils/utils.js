import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import db from "./firebase";

// Utils
export const handleNew = async (collectionName, document) => {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, document);
    return docRef.id;
};

export const handleEdit = async (collectionName, id, document) => {
    const docRef = doc(db, collectionName, id);
    setDoc(docRef, document);
    return docRef.id;
};

export const handleDelete = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};
