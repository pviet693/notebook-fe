import {
    Search,
    PenSquare,
    User,
    LogOut,
    Settings,
    LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { Link, useRouter } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NotificationBell from "@/components/Navbar/NotificationBell";
import AuthButtons from "@/components/Navbar/AuthButtons";
import useAuthContext from "@/hooks/auth/useAuthContext";
import SearchInput from "@/components/Navbar/SearchInput";

export default function Navbar() {
    const router = useRouter();
    const { isLoggedIn, user, signout } = useAuthContext();

    const handleSignout = () => {
        signout();
        router.invalidate();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-b-[#f2f8f7] bg-white backdrop-blur supports-[backdrop-filter]:bg-white/90">
            <div className="container flex h-16 items-center justify-between max-md:px-4">
                <Link to="/" className="flex items-center space-x-2">
                    <Logo />
                </Link>
                <div className="flex items-center space-x-4 max-md:space-x-2">
                    <SearchInput className="max-md:hidden" />

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="w-full">
                            <SearchInput className="mt-4" />
                        </SheetContent>
                    </Sheet>

                    <Link to="/blogs/create">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <PenSquare className="h-5 w-5" />
                        </Button>
                        <Button className="bg-primary hover:bg-primary hover:opacity-90 text-primary-foreground font-normal text-sm hidden md:flex">
                            <PenSquare className="mr-2 h-4 w-4" />
                            <span>Write</span>
                        </Button>
                    </Link>

                    {isLoggedIn() ? (
                        <>
                            <NotificationBell />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-8 w-8 cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile_img}
                                            alt={user?.fullname}
                                        />
                                        <AvatarFallback>
                                            {user?.fullname[0] ?? "NB"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="p-2">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="flex items-center gap-2"
                                            to="/me/settings/profile"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="flex items-center gap-2"
                                            to="/me/dashboard/blogs"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="flex items-center gap-2"
                                            to="/me/settings/password"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <AuthButtons />
                    )}
                </div>
            </div>
        </header>
    );
}
