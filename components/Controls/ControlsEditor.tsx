import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

const extensions = [
  StarterKit
];

export default function ControlsEditor ({ text, onUpdate }: Props) {
  const editor = useEditor({
    extensions: extensions,
    content: text,
    onUpdate: ({ editor }) => { 
      onUpdate instanceof Function ? onUpdate(editor.getHTML()) : () => {}
    }
  })

  useEffect(() => {
    if (editor?.getHTML().trim() !== text.trim()) {
      editor?.commands.setContent(text);
    }
  }, [editor, text]);

  return <EditorContent editor={editor} />;
}

interface Props {
  text: string;
  onUpdate?: (text: string) => void;
}