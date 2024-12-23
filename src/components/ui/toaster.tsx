import { useToast } from "@/hooks/use-toast";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport
} from "./toast";
import { cn } from "@/lib/utils";

const backgroundColors = {
    success: "bg-green-50",
    error: "bg-red-50",
    warning: "bg-yellow-50",
    info: "bg-blue-100"
} as const;

const borderColors = {
    success: "border-brand-100",
    error: "border-error-100",
    warning: "border-warning-100",
    info: "border-blue-200"
} as const;

export function Toaster() {
    const { toasts } = useToast();
    const lastIndex = toasts.length - 1;

    return (
        <ToastProvider>
            {toasts.map(function (
                { id, title, description, action, ...props },
                idx
            ) {
                return (
                    <Toast
                        key={id}
                        {...props}
                        className={cn(
                            "p-spacing-xl border-[1px] ml-auto",
                            backgroundColors[
                                props.variant as keyof typeof backgroundColors
                            ],
                            borderColors[
                                props.variant as keyof typeof borderColors
                            ],
                            {
                                "mt-2": idx !== lastIndex
                            }
                        )}
                    >
                        <div className="flex flex-row items-center gap-1 w-fit">
                            {title && (
                                <ToastTitle variant={props.variant}>
                                    {title}
                                </ToastTitle>
                            )}
                            {description && (
                                <ToastDescription>
                                    {description}
                                </ToastDescription>
                            )}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport className="top-0 left-0" />
        </ToastProvider>
    );
}
