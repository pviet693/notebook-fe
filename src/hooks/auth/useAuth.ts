import { AUTH_TOKEN } from "@/constants";
import { useGetMeQuery } from "@/hooks/auth/useGetMeQuery";
import { User } from "@/types";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    const signout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        setUser(null);
    };

    const signin = (token: string, userData: User) => {
        localStorage.setItem(AUTH_TOKEN, token);
        setUser(userData);
    };

    const { isSuccess, data: userData, refetch } = useGetMeQuery();

    useEffect(() => {
        if (isSuccess && userData?.data) {
            setUser(userData.data);
        }
    }, [isSuccess, userData, setUser]);

    useEffect(() => {
        refetch();
    }, [user?.id, refetch]);

    const isLoggedIn = () => !!user?.id;

    return { setUser, user, isLoggedIn, signin, signout, isSuccess };
};

export default useAuth;

export type AuthContextType = ReturnType<typeof useAuth>;
