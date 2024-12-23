import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { FileText, Key, Menu, User2, X } from "lucide-react";
import { Dispatch, useState } from "react";

export const Route = createFileRoute("/_layout/_authenticated/me")({
    component: MeLayout
});

function MeLayout() {
    const isMobile = useIsMobile();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex bg-gray-100 relative">
            {/* Sidebar */}
            {!isMobile ? (
                <Sidebar />
            ) : (
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="fixed top-20 right-4 z-20 p-2 bg-white rounded-md shadow-md w-9 h-9"
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? (
                                <X className="!w-6 !h-6 relative" />
                            ) : (
                                <Menu className="!w-6 !h-6" />
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <SheetHeader>
                            <VisuallyHidden>
                                <SheetTitle>Sidebar</SheetTitle>
                                <SheetDescription>Sidebar</SheetDescription>
                            </VisuallyHidden>
                        </SheetHeader>
                        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
                    </SheetContent>
                </Sheet>
            )}

            {/* Main content */}
            <main className="flex-1 overflow-y-auto w-full">
                <Outlet />
            </main>
        </div>
    );
}

const navItems = [
    { icon: FileText, label: "Blogs", href: "/me/dashboard/blogs" }
    // { icon: Bell, label: "Notifications", href: "/me/dashboard/notifications" }
];

const settingsItems = [
    { icon: User2, label: "Edit Profile", href: "/me/settings/profile" },
    { icon: Key, label: "Change Password", href: "/me/settings/password" }
];

function Sidebar({
    setIsSidebarOpen
}: {
    setIsSidebarOpen?: Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <aside
            className={cn(
                "absolute lg:sticky bottom-0 left-0 top-0 z-10 min-w-64 border-r max-lg:border-none lg:bg-white transform transition-transform duration-300 ease-in-out"
            )}
        >
            <nav className="mt-8">
                <h2 className="px-4 text-lg font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Dashboard
                </h2>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                to={item.href}
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                activeProps={{ className: "bg-gray-100" }}
                                onClick={() => setIsSidebarOpen?.(false)}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="mt-8">
                <h2 className="px-4 text-lg font-semibold text-gray-600 uppercase tracking-wide mb-2">
                    Settings
                </h2>
                <ul>
                    {settingsItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                to={item.href}
                                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                                activeProps={{ className: "bg-gray-100" }}
                                onClick={() => setIsSidebarOpen?.(false)}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
