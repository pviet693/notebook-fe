import { PASSWORD_REGEX } from "@/constants";
import { z } from "zod";

export type User = {
    id: string;
    fullname: string;
    email: string;
    password: string;
    username: string;
    bio: string;
    profile_img: string;
    youtube: string;
    instagram: string;
    facebook: string;
    twitter: string;
    github: string;
    website: string;
    google_auth: boolean;
    email_verified: boolean;
};

export const signUpFormSchema = z
    .object({
        fullname: z
            .string()
            .min(1, "Full name is required")
            .min(3, "Full name must be at least 3 characters long")
            .max(255, "Full name must not exceed 255 characters"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Invalid email format")
            .min(5, "Email must be at least 5 characters long")
            .max(255, "Email must not exceed 255 characters"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 6 characters long")
            .max(255, "Password must not exceed 255 characters")
            .regex(
                PASSWORD_REGEX,
                "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
            ),
        confirmedPassword: z.string().min(1, "Confirmed Password is required")
    })
    .refine((data) => data.password === data.confirmedPassword, {
        message: "Passwords don't match",
        path: ["confirmedPassword"]
    });

export type SignUpFormData = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, "Password is required")
});

export type SignInFormData = z.infer<typeof signInFormSchema>;
