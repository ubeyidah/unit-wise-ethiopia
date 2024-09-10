import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import useUploadImage from "@/hooks/useUploadImage";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

interface EditorProp {
  onChange: (value: PartialBlock[]) => void;
  initialContent?: string;
  editable?: boolean;
}
const Editor = ({ onChange, initialContent, editable }: EditorProp) => {
  const { theme } = useTheme();
  const identifySytemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
  const [currentTheme] = useState(
    theme === "system" ? identifySytemTheme : theme
  );

  let { uploadAsyncImage } = useUploadImage();
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const res = await uploadAsyncImage(file, "postImages");
      return res;
    },
  });

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => onChange(editor.document)}
      editable={editable}
      theme={currentTheme as "light" | "dark"}
    />
  );
};

export default Editor;
