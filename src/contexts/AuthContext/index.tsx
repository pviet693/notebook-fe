// auth.tsx

import * as React from "react";
import useAuth, { type AuthContextType } from "@/hooks/auth/useAuth";

export const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={{ ...auth }}>
            {children}
        </AuthContext.Provider>
    );
}

