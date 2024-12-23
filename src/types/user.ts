import { PASSWORD_REGEX } from "@/constants";
import { z } from "zod";

export const editProfileFormSchema = z.object({
    profileImg: z.string().min(1, "Avatar image is required"),
    profileImgFile: z.custom<File>().nullable(),
    fullname: z
        .string()
        .min(1, "Full name is required")
        .min(3, "Full name must be at least 3 characters long")
        .max(255, "Full name must not exceed 255 characters"),
    email: z.string().email("Invalid email address"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(255, "Username must not exceed 255 characters"),
    bio: z.string().max(500, "Bio must not exceed 500 characters"),
    youtube: z.string().url("Invalid URL").optional().or(z.literal("")),
    instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
    facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
    website: z.string().url("Invalid URL").optional().or(z.literal(""))
});

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;

export type EditProfilePayload = Omit<
    EditProfileFormData,
    "profileImg" | "profileImgFile"
> & {
    profile_img: string;
};

export const changePasswordFormSchema = z.object({
    currentPassword: z
        .string()
        .min(1, "Current Password is required")
        .min(6, "Current Password must be at least 6 characters long")
        .max(255, "Current Password must not exceed 255 characters"),
    newPassword: z
        .string()
        .min(1, "New Password is required")
        .min(6, "New Password must be at least 6 characters long")
        .max(255, "New Password must not exceed 255 characters")
        .regex(
            PASSWORD_REGEX,
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        )
});

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>;
