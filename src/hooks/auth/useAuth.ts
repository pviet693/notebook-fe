import { AUTH_TOKEN, USER_ID } from "@/constants";
import { User } from "@/types";
import { useState } from "react";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState(() => localStorage.getItem(USER_ID) ?? "")
    const isLoggedIn = () => !!localStorage.getItem(AUTH_TOKEN);

    const signout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(USER_ID);
        setUser(null);
        setUserId("");
    };

    const signin = (token: string, userData: User) => {
        localStorage.setItem(AUTH_TOKEN, token);
        localStorage.setItem(USER_ID, userData.id);
        setUser(userData);
        setUserId(userData.id);
    };

    return { setUser, user, isLoggedIn, signin, signout, userId };
};

export default useAuth;

export type AuthContextType = ReturnType<typeof useAuth>;
