"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Youtube as YoutubeIcon,
  Link as LinkIcon
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story here...",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: "w-full aspect-video rounded-lg my-4",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg prose-neutral max-w-none focus:outline-none min-h-[500px] py-4",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addYoutube = () => {
    const url = window.prompt("Enter YouTube URL:");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    
    if (url === null) return;
    
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-neutral-200/80 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#fafafa] border-b border-neutral-200/80 sticky top-0 z-10">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive("bold") ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive("italic") ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive("strike") ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-neutral-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors font-bold text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors font-bold text-sm ${editor.isActive("heading", { level: 3 }) ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Heading 2"
        >
          H2
        </button>
        <div className="w-px h-4 bg-neutral-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive("bulletList") ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive("orderedList") ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive("blockquote") ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-neutral-300 mx-1" />
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-neutral-200 transition-colors ${editor.isActive("link") ? "bg-neutral-200 text-black" : "text-neutral-600"}`}
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-neutral-200 transition-colors text-neutral-600"
          title="Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={addYoutube}
          className="p-2 rounded hover:bg-neutral-200 transition-colors text-neutral-600"
          title="YouTube"
        >
          <YoutubeIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="px-6 py-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
