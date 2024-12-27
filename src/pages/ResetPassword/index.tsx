import { ResetPasswordForm } from "@/components/ResetPassword";

export default function ResetPasswordPagePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Reset Your Password
                </h1>
                <ResetPasswordForm />
            </div>
        </div>
    );
}
