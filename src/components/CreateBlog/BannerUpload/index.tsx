import { Button } from "@/components/ui/button";
import { UploadCloud, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
    onChange: (file: File | null, bannerUrl: string) => void;
    bannerUrl: string;
}

function FileUpload({
    bannerUrl,
    onChange
}: FileUploadProps) {
    const { toast } = useToast();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "Upload failed",
                    description: "File size exceeds 5MB. Please choose a smaller file.",
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

    return (
        <div className="mb-6">
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-[450px] max-md:h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    {bannerUrl ? (
                        <div className="relative w-full h-full">
                            <img
                                src={bannerUrl}
                                alt="Uploaded banner"
                                className="rounded-lg w-full h-full object-cover"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChange(null, "")
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 5MB)
                            </p>
                        </div>
                    )}
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </label>
            </div>
        </div>
    );
}

export default FileUpload;
