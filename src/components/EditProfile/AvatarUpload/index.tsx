import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface AvatarUploadProps {
    onChange: (file: File | null, bannerUrl: string) => void;
    profileImg: string;
}

function AvatarUpload({ profileImg, onChange }: AvatarUploadProps) {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast({
                    title: "Upload failed",
                    description:
                        "File size exceeds 2MB. Please choose a smaller file.",
                    variant: "error"
                });
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    onChange(file, reader.result as string);
                };
                img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="mb-8">
            <div className="flex items-center w-full">
                <div className="flex items-center gap-6">
                    <Avatar className="h-[100px] w-[100px]">
                        <AvatarImage src={profileImg} alt="Avatar image" />
                        <AvatarFallback>NB</AvatarFallback>
                    </Avatar>
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                        <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={handleButtonClick}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                        </Button>
                        <input
                            ref={fileInputRef}
                            id="avatar-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default AvatarUpload;
