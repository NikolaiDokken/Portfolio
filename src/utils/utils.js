import { collection, addDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import db, { storage } from "./firebase";
import { ref, getDownloadURL } from "@firebase/storage";

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

export const getFileFromStorage = async (path) => {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
};

export const writeToSessionStorage = (key, value) => {
    window.sessionStorage.setItem(key, value);
};

export const readFromSessionStorage = (key) => {
    return window.sessionStorage.getItem(key);
};
