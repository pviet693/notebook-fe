import { EditorBubble, useEditor } from "novel";
import { removeAIHighlight } from "novel/extensions";
import {} from "novel/plugins";
import { Fragment, type ReactNode, useEffect } from "react";
import { AISelector } from "@/components/CreateBlog/ContentEditor/AISelector";
import { Button } from "@/components/ui/button";
import Magic from "@/components/icons/Magic";

interface GenerativeMenuSwitchProps {
    children: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
    children,
    open,
    onOpenChange
}: GenerativeMenuSwitchProps) => {
    const { editor } = useEditor();

    useEffect(() => {
        if (!open) removeAIHighlight(editor!);
    }, [open, editor]);
    return (
        <EditorBubble
            tippyOptions={{
                placement: open ? "bottom-start" : "top",
                onHidden: () => {
                    onOpenChange(false);
                    editor!.chain().unsetHighlight().run();
                }
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
        >
            {open && <AISelector open={open} onOpenChange={onOpenChange} />}
            {!open && (
                <Fragment>
                    <Button
                        className="gap-1 rounded-none text-primary hover:text-primary"
                        variant="ghost"
                        type="button"
                        onClick={() => onOpenChange(true)}
                        size="sm"
                    >
                        <Magic className="h-5 w-5" />
                        Ask AI
                    </Button>
                    {children}
                </Fragment>
            )}
        </EditorBubble>
    );
};

export default GenerativeMenuSwitch;
