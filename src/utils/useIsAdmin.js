import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";
import { auth } from "./firebase";

const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const isAdmin = httpsCallable(functions, "isAdmin");
            isAdmin().then((res) => setIsAdmin(res.data));
        });
        return () => unsubscribe();
    }, []);

    return isAdmin;
};

export default useIsAdmin;
