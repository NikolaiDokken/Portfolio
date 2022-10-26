import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const useFirebaseAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setAuthUser(user) : setAuthUser(null);

            const isAdmin = httpsCallable(functions, "isAdmin");
            user ? isAdmin().then((res) => setIsAdmin(res.data)) : setIsAdmin(false);
        });
        return () => unsubscribe();
    }, []);

    return { authUser, isAdmin };
};

export default useFirebaseAuthentication;
