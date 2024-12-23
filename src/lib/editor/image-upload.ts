import { uploadFile } from "@/services/upload";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = (file: File) => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    const promise = uploadFile(formData);

    return new Promise((resolve, reject) => {
        toast.promise(
            promise.then(async (res) => {
                // Successfully uploaded image
                if (res.success) {
                    const { data } = res;
                    const url = data!.fileUrl;
                    // preload the image
                    const image = new Image();
                    image.src = url;
                    image.onload = () => {
                        resolve(url);
                    };
                    // No blob store configured
                } else {
                    toast.error("Failed to upload image: " + res.message);
                    reject(res.message);
                }
            }),
            {
                loading: "Uploading image...",
                success: "Image uploaded successfully.",
                error: (e) => {
                    reject(e);
                    return e.message;
                }
            }
        );
    });
};

export const uploadFn = createImageUpload({
    onUpload,
    validateFn: (file) => {
        if (!file.type.includes("image/")) {
            toast.error("File type not supported.");
            return false;
        }
        if (file.size / 1024 / 1024 > 20) {
            toast.error("File size too big (max 20MB).");
            return false;
        }
        return true;
    }
});
