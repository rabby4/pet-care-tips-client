"use client"
import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ImageResize from "tiptap-extension-resize-image"
import { FC } from "react"
import ToolBar from "./ToolBar"

// Define the props interface
interface RichTextEditorProps {
	content: string // content passed to the editor
	onChange: (content: string) => void // function that handles content change
}

const Tiptap: FC<RichTextEditorProps> = ({ content, onChange }) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure(),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Heading.configure({
				levels: [1, 2, 3],
			}),
			OrderedList.configure({
				HTMLAttributes: {
					class: "list-decimal ml-3",
				},
			}),
			BulletList.configure({
				HTMLAttributes: {
					class: "list-disc ml-3",
				},
			}),
			Highlight,
			Image,
			ImageResize,
		],
		content: content,
		editorProps: {
			attributes: {
				class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
			},
		},
		onUpdate: ({ editor }) => {
			// Handle content update
			const updatedHTML = editor.getHTML()
			onChange(updatedHTML)
		},
	})

	return (
		<div>
			<ToolBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}

export default Tiptap
