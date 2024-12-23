import { editProfile } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export function useEditProfileMutation() {
    return useMutation({
        mutationFn: editProfile
    });
}
