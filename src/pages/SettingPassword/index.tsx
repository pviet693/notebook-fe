import Container from "@/components/Container";
import { SettingPasswordForm } from "@/components/SettingPassword";

export default function SettingPasswordPage() {
    return (
        <Container className="bg-white h-full min-h-[calc(100vh-120px)]">
            <h1 className="text-2xl font-semibold mb-6">Change Password</h1>

            <SettingPasswordForm />
        </Container>
    );
}
