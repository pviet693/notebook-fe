import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PenSquare } from "lucide-react";

export default function ShareKnowledge() {
    return (
        <div className="bg-[#f2f8f7] w-full py-[56px] px-[232px] max-md:p-5 flex flex-col items-center gap-6 max-md:gap-3">
            <h3 className="text-xl leading-[1.875rem] font-semibold text-center max-md:text-[1rem] max-md:leading-[1.25rem]">
                Share your knowledge with our readers
            </h3>
            <Link href="/blogs/create">
                <Button className="flex gap-2 border border-[#00aaa1] py-4 px-7 bg-[#f2f8f7] font-normal">
                    <PenSquare className="text-[#00aaa1] w-[14px] h-[14px]" />
                    <span className="text-[17px] max-md:text-sm text-primary leading-[17px] font-normal">Write on Notebook</span>
                </Button>
            </Link>
        </div>
    );
}
