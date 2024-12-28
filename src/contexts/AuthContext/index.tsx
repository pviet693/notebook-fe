// auth.tsx

import * as React from "react";
import useAuth, { type AuthContextType } from "@/hooks/auth/useAuth";

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
    render
}: {
    children?: React.ReactNode;
    render?: (auth: AuthContextType) => React.ReactNode;
}) {
    const auth = useAuth();

    if (render) {
        return (
            <AuthContext.Provider value={auth}>
                {render(auth)}
            </AuthContext.Provider>
        );
    }

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
