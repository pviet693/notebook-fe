import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";
import {
    type EditProfileFormData,
    editProfileFormSchema,
    EditProfilePayload
} from "@/types/user";
import { AvatarUpload } from "@/components/EditProfile";
import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { socials } from "@/constants";
import { useGetMeQuery } from "@/hooks/auth/useGetMeQuery";
import { useEffect } from "react";
import useAuthContext from "@/hooks/auth/useAuthContext";
import { useEditProfileMutation } from "@/hooks/user/useEditProfileMutation";
import { useUploadMutation } from "@/hooks/upload/useUploadMutation";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { type User } from "@/types";

export default function EditProfilePage() {
    const { toast } = useToast();
    const { userId, setUser } = useAuthContext();
    const { data, isSuccess } = useGetMeQuery(userId);
    const { mutate: editProfileMutation } = useEditProfileMutation();
    const { mutate: uploadFile } = useUploadMutation();
    const form = useForm<EditProfileFormData>({
        resolver: zodResolver(editProfileFormSchema),
        defaultValues: {
            profileImg: "",
            profileImgFile: null,
            fullname: "",
            email: "",
            username: "",
            bio: "",
            youtube: "",
            instagram: "",
            facebook: "",
            twitter: "",
            github: "",
            website: ""
        }
    });

    const editProfile = (values: EditProfileFormData) => {
        const payload: EditProfilePayload = {
            fullname: values.fullname,
            email: values.email,
            bio: values.bio,
            profile_img: values.profileImg,
            username: values.username,
            youtube: values.youtube,
            instagram: values.instagram,
            facebook: values.facebook,
            twitter: values.twitter,
            github: values.github,
            website: values.website
        };

        editProfileMutation(payload, {
            onSuccess: () => {
                toast({
                    title: "Profile updated",
                    description: "Your profile has been updated successfully.",
                    variant: "success"
                });
                form.reset(values);
                setUser((pre) => ({
                    ...pre,
                    fullname: values.fullname,
                    bio: values.bio,
                    profile_img: values.profileImg,
                    username: values.username
                }) as User);
            },
            onError: (error) => {
                const axiosError = error as AxiosError<{ message: string }>;
                toast({
                    title: "Error updating profile",
                    description:
                        axiosError.response?.data.message ?? error.message,
                    variant: "error"
                });
            }
        });
    };

    function onSubmit(values: EditProfileFormData) {
        const { dirtyFields } = form.formState;
        if (dirtyFields.profileImg && values.profileImgFile !== null) {
            const formData = new FormData();
            formData.append("file", values.profileImgFile);

            uploadFile(formData, {
                onSuccess: ({ data }) => {
                    editProfile({ ...values, profileImg: data!.fileUrl });
                }
            });
        } else {
            editProfile(values);
        }
    }

    const handleVerifyEmail = () => {
        // toast({
        //     title: "Verification email sent",
        //     description:
        //         "Please check your inbox and follow the instructions to verify your email."
        // });
        // In a real application, you would trigger the email verification process here
    };

    useEffect(() => {
        if (isSuccess) {
            const formData = {
                profileImg: data?.data?.profile_img,
                profileImgFile: null,
                fullname: data?.data?.fullname,
                email: data?.data?.email,
                username: data?.data?.username,
                bio: data?.data?.bio,
                youtube: data?.data?.youtube,
                instagram: data?.data?.instagram,
                facebook: data?.data?.facebook,
                twitter: data?.data?.twitter,
                github: data?.data?.github,
                website: data?.data?.website
            };
            form.reset(formData);
        }
    }, [isSuccess]);

    return (
        <Container className="bg-white">
            <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

            <div className="max-w-2xl">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="profileImg"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <FormControl>
                                        <AvatarUpload
                                            profileImg={field.value}
                                            onChange={(file, url) => {
                                                field.onChange(url);
                                                form.setValue(
                                                    "profileImgFile",
                                                    file
                                                );
                                                form.trigger("profileImgFile");
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="max-md:text-xs"
                                            placeholder="Please enter your Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <div className="flex gap-2 items-center">
                                        <FormControl>
                                            <Input
                                                className="max-md:text-xs"
                                                disabled
                                                placeholder="Please enter your Email Address"
                                                {...field}
                                            />
                                        </FormControl>
                                        {data?.data?.email_verified ? (
                                            <Badge
                                                variant="outline"
                                                className="h-8 px-3 flex items-center gap-1 bg-[#f2f8f7] max-md:text-xs rounded-md text-primary"
                                            >
                                                <Check className="w-4 h-4" />
                                                Verified
                                            </Badge>
                                        ) : (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleVerifyEmail}
                                                className="inline-flex items-center max-md:text-xs gap-2 bg-[#e06f6c26] hover:bg-[#e06f6c26] border-[#e06f6c26]"
                                            >
                                                <AlertCircle className="w-4 h-4 text-destructive" />
                                                <span>Verify</span>
                                            </Button>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="max-md:text-xs"
                                            placeholder="Please enter your Username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us about yourself"
                                            className="max-md:text-xs"
                                            rows={5}
                                            maxLength={500}
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="text-xs text-gray-500 absolute right-0 top-0">
                                        {field.value?.length || 0}/500 chars
                                        limit
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                Add your social handles below
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {socials.map((social) => (
                                    <FormField
                                        key={social}
                                        control={form.control}
                                        name={social}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="capitalize">
                                                    {social}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={`https://`}
                                                        className="max-md:text-xs"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <Button type="submit">Update</Button>
                    </form>
                </Form>
            </div>
        </Container>
    );
}
