import NotFound from "@/components/NotFound";
import { AuthContextType } from "@/hooks/auth/useAuth";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { useGetMeQuery } from "@/hooks/auth/useGetMeQuery";
import { useIncrWebVisitMutation } from "@/hooks/stats/useIncrWebVisitMutation";
import {
    createRootRouteWithContext,
    Outlet,
    useRouter
} from "@tanstack/react-router";
import { useEffect } from "react";

type RouterContext = {
    auth: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RouteComponent,
    notFoundComponent: NotFound
});

function RouteComponent() {
    const router = useRouter();
    const { userId, setUser } = useAuthContext();
    const { data: userData, isSuccess } = useGetMeQuery(userId);
    const { mutate: incrWebVisitMutation } = useIncrWebVisitMutation();

    useEffect(() => {
        if (isSuccess && userData?.data) {
            setUser(userData.data);
            router.invalidate();
        }
    }, [isSuccess, userData, setUser, router]);

    useEffect(() => {
        const hasVisitedPage = sessionStorage.getItem("hasVisitedPage");

        if (!hasVisitedPage) {
            sessionStorage.setItem("hasVisitedPage", "true");
            incrWebVisitMutation();
        }
    }, [incrWebVisitMutation]);

    return <Outlet />;
}
