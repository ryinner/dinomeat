import TextStyle from "@tiptap/extension-text-style";
import {
  BubbleMenu,
  Editor,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const extensions = [TextStyle, StarterKit];

const headingLevels = [2, 3, 4] satisfies (2 | 3 | 4)[];

export default function ControlsEditor({ value, onInput }: Props) {
  const editor = useEditor({
    extensions: extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onInput instanceof Function ? onInput(editor.getHTML()) : () => {};
    },
  });

  useEffect(() => {
    if (editor?.getHTML().trim() !== value.trim()) {
      editor?.commands.setContent(value);
    }
  }, [editor, value]);

  return (
    <>
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
}

function MenuBar({ editor }: { editor: Editor }) {
  return (
    <>
      <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
        {headingLevels.map((hl) => (
          <button
            type="button"
            key={hl}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: hl }).run()
            }
            className={
              editor.isActive("heading", { level: hl }) ? "is-active" : ""
            }
          >
            {`h${hl}`}
          </button>
        ))}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          * список
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          1. список
        </button>
      </FloatingMenu>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          strike
        </button>
      </BubbleMenu>
    </>
  );
}

interface Props {
  value: string;
  onInput?: (text: string) => void;
}
