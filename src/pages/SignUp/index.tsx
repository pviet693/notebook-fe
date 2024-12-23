import { SignUpForm, RightBackground } from "@/components/Auth";
import Logo from "@/components/Navbar/Logo";
import { Link } from "@tanstack/react-router";

function SignUpPage() {
    return (
        <div className="flex min-h-screen">
            <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
                <div className="w-full max-w-md p-8">
                    <Link
                        to="/"
                        className="flex items-center justify-center mb-12"
                    >
                        <Logo />
                    </Link>
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        Join Our Community
                    </h1>
                    <SignUpForm />
                </div>
            </div>
            <RightBackground />
        </div>
    );
}

export default SignUpPage;
