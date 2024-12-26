import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchStreamedResponse } from "@/services/ai";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { type StreamedAIPayload } from "@/types/ai";

interface UseStreamCompletionReturn {
    completion: string;
    isLoading: boolean;
    isFinished: boolean;
    startStream: (payload: StreamedAIPayload) => Promise<void>;
}

const useStreamCompletion = (): UseStreamCompletionReturn => {
    const { toast } = useToast();
    const [completion, setCompletion] = useState<string>("");
    const [isFinished, setIsFinished] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: (payload: StreamedAIPayload) =>
            fetchStreamedResponse(payload, (chunk: string) => {
                setCompletion((prev) => prev + chunk);
            }),
        onSuccess: () => {
            setIsFinished(true);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message ?? error.message,
                variant: "error"
            });
            setIsFinished(true);
        }
    });

    const startStream = async (payload: StreamedAIPayload) => {
        setCompletion("");
        setIsFinished(false);
        await mutation.mutateAsync(payload);
    };

    return {
        completion,
        isLoading: mutation.isPending,
        isFinished,
        startStream
    };
};

export default useStreamCompletion;
