import { collection, where, getDocs, query, limit } from "firebase/firestore";
import db from "./firebase";

export const getProjectBySlug = async (slug) => {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
};
