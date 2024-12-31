import { AUTH_TOKEN } from "@/constants";
import { useGetMeQuery } from "@/hooks/auth/useGetMeQuery";
import { User } from "@/types";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    const signout = () => {
        localStorage.removeItem(AUTH_TOKEN);
        setUser(null);
        refetch();
    };

    const signin = (token: string, userData: User) => {
        localStorage.setItem(AUTH_TOKEN, token);
        setUser(userData);
        refetch();
    };

    const { isSuccess, data: userData, refetch } = useGetMeQuery();

    useEffect(() => {
        if (isSuccess && userData?.data) {
            setUser(userData.data);
        }
    }, [isSuccess, userData, setUser]);

    console.log(isSuccess, user);


    return { setUser, user, isLoggedIn: isSuccess && user, signin, signout, isSuccess };
};

export default useAuth;

export type AuthContextType = ReturnType<typeof useAuth>;
