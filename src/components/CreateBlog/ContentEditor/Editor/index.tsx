import { defaultEditorContent } from "@/lib/editor/content";
import {
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    type EditorInstance,
    EditorRoot,
    type JSONContent
} from "novel";
import { handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "@/lib/editor/extensions";
import { ColorSelector } from "@/components/CreateBlog/ContentEditor/ColorSelector";
import { LinkSelector } from "@/components/CreateBlog/ContentEditor/LinkSelector";
import { NodeSelector } from "@/components/CreateBlog/ContentEditor/NodeSelector";
import { MathSelector } from "@/components/CreateBlog/ContentEditor/MathSelector";
import { TextButtons } from "@/components/CreateBlog/ContentEditor/TextButtons";
import { Separator } from "@/components/ui/separator";

import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "@/lib/editor/image-upload";
import {
    slashCommand,
    suggestionItems
} from "@/components/CreateBlog/ContentEditor/SlashCommand";
import hljs from "highlight.js";
import GenerativeMenuSwitch from "@/components/CreateBlog/ContentEditor/GenerativeMenuSwitch";

const extensions = [...defaultExtensions, slashCommand];

type InitialContentType = {
    type: string;
    content: JSONContent[];
};

type EditorProps = {
    initialContent?: InitialContentType | null;
    onChange: (jsonContent: JSONContent, htmlContent: string) => void;
};

const Editor = ({ initialContent, onChange }: EditorProps) => {
    const [initContent, setInitContent] = useState<null | InitialContentType>(
        null
    );
    const [wordsCount, setWordsCount] = useState();
    const [charsCount, setCharsCount] = useState();

    const [openNode, setOpenNode] = useState(false);
    const [openColor, setOpenColor] = useState(false);
    const [openLink, setOpenLink] = useState(false);
    const [openAI, setOpenAI] = useState(false);

    const highlightCodeblocks = (content: string) => {
        const doc = new DOMParser().parseFromString(content, "text/html");
        doc.querySelectorAll("pre code").forEach((el: Element) => {
            hljs.highlightElement(el as HTMLElement);
        });
        return new XMLSerializer().serializeToString(doc);
    };

    const debouncedUpdates = useDebouncedCallback((editor: EditorInstance) => {
        setWordsCount(editor.storage.characterCount.words());
        setCharsCount(editor.storage.characterCount.characters());

        const htmlContent = highlightCodeblocks(editor.getHTML());
        const jsonContent = editor.getJSON();

        onChange(jsonContent, htmlContent);
    }, 500);

    useEffect(() => {
        if (initialContent === undefined) {
            setInitContent(defaultEditorContent);
            return;
        } else {
            setInitContent(initialContent);
        }
    }, [initialContent]);

    if (initContent === null) return null;

    return (
        <div className="relative w-full">
            <div className="flex absolute right-0 -top-8 gap-2">
                <div
                    className={
                        wordsCount
                            ? "rounded-lg bg-accent px-2 py-1 text-xs text-[#98A2B3] font-medium leading-[1.125rem]"
                            : "hidden"
                    }
                >
                    {wordsCount} Words
                </div>
                <div
                    className={
                        charsCount
                            ? "rounded-lg bg-accent px-2 py-1 text-xs text-[#98A2B3] font-medium leading-[1.125rem]"
                            : "hidden"
                    }
                >
                    {charsCount} Characters
                </div>
            </div>
            <EditorRoot>
                <EditorContent
                    initialContent={initialContent!}
                    extensions={extensions}
                    className="relative min-h-[500px] w-full rounded-md border border-input bg-background shadow-sm"
                    editorProps={{
                        handleDOMEvents: {
                            keydown: (_view, event) =>
                                handleCommandNavigation(event)
                        },
                        handlePaste: (view, event) =>
                            handleImagePaste(view, event, uploadFn),
                        handleDrop: (view, event, _slice, moved) =>
                            handleImageDrop(view, event, moved, uploadFn),
                        attributes: {
                            class: "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full"
                        }
                    }}
                    onUpdate={({ editor }) => {
                        debouncedUpdates(editor);
                    }}
                    onCreate={({ editor }) => {
                        setWordsCount(editor.storage.characterCount.words());
                        setCharsCount(
                            editor.storage.characterCount.characters()
                        );
                    }}
                >
                    <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
                        <EditorCommandEmpty className="px-2 text-muted-foreground">
                            No results
                        </EditorCommandEmpty>
                        <EditorCommandList>
                            {suggestionItems.map((item) => (
                                <EditorCommandItem
                                    value={item.title}
                                    onCommand={(val) => item?.command?.(val)}
                                    className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                                    key={item.title}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </EditorCommandItem>
                            ))}
                        </EditorCommandList>
                    </EditorCommand>

                    <GenerativeMenuSwitch
                        open={openAI}
                        onOpenChange={setOpenAI}
                    >
                        <Separator orientation="vertical" />
                        <NodeSelector
                            open={openNode}
                            onOpenChange={setOpenNode}
                        />
                        <Separator orientation="vertical" />

                        <LinkSelector
                            open={openLink}
                            onOpenChange={setOpenLink}
                        />
                        <Separator orientation="vertical" />
                        <MathSelector />
                        <Separator orientation="vertical" />
                        <TextButtons />
                        <Separator orientation="vertical" />
                        <ColorSelector
                            open={openColor}
                            onOpenChange={setOpenColor}
                        />
                    </GenerativeMenuSwitch>
                </EditorContent>
            </EditorRoot>
        </div>
    );
};

export default Editor;
