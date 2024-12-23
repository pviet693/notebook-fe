import background from "@/assets/imgs/auth-background.webp";

function RightBackGround() {
    return (
        <div className="relative hidden w-1/2 lg:block">
            <img src={background} alt="Auth background" className="object-cover w-full h-full" />
        </div>
    );
}

export default RightBackGround;
