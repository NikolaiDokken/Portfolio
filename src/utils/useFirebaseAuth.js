import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";

const useFirebasAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setAuthUser(user) : setAuthUser(null);
        });
        return () => unsubscribe();
    }, []);

    return authUser;
};

export default useFirebasAuthentication;
