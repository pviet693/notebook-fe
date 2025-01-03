import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
