import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";

import useAuth from "@/hooks/auth/useAuth";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

// Create a new router instance
const router = createRouter({
    routeTree,
    context: {
        auth: {
            userId: "",
            user: null,
            setUser: () => {},
            isLoggedIn: () => false,
            signin: () => {},
            signout: () => {}
        }
    }
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

function App() {
    const auth = useAuth();

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <ThemeProvider attribute="class">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} context={{ auth }} />
                    <Toaster />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
