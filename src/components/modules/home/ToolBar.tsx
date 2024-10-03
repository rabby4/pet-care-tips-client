"use client"
import {
	List,
	ListOrdered,
	Heading1,
	Heading2,
	Heading3,
	Code,
	Bold,
	Italic,
	Strikethrough,
	AlignCenter,
	AlignLeft,
	AlignRight,
	Highlighter,
	Upload,
} from "lucide-react"
import { Editor } from "@tiptap/react" // Import the Editor type
import { Switch } from "@nextui-org/switch"

interface ToolBarProps {
	editor: Editor | null // Editor can be null when initializing
}

export default function ToolBar({ editor }: ToolBarProps) {
	if (!editor) return null

	const addImage = () => {
		const url = window.prompt("URL")
		if (url) {
			editor.chain().focus().setImage({ src: url }).run()
		}
	}

	const Options = [
		{
			icon: <Heading1 className="size-4" />,
			onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
			checked: editor.isActive("heading", { level: 1 }),
		},
		{
			icon: <Heading2 className="size-4" />,
			onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
			checked: editor.isActive("heading", { level: 2 }),
		},
		{
			icon: <Heading3 className="size-4" />,
			onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
			checked: editor.isActive("heading", { level: 3 }),
		},
		{
			icon: <Bold className="size-4" />,
			onClick: () => editor.chain().focus().toggleBold().run(),
			checked: editor.isActive("bold"),
		},
		{
			icon: <Italic className="size-4" />,
			onClick: () => editor.chain().focus().toggleItalic().run(),
			checked: editor.isActive("italic"),
		},
		{
			icon: <Strikethrough className="size-4" />,
			onClick: () => editor.chain().focus().toggleStrike().run(),
			checked: editor.isActive("strike"),
		},
		{
			icon: <AlignLeft className="size-4" />,
			onClick: () => editor.chain().focus().setTextAlign("left").run(),
			checked: editor.isActive({ textAlign: "left" }),
		},
		{
			icon: <AlignCenter className="size-4" />,
			onClick: () => editor.chain().focus().setTextAlign("center").run(),
			checked: editor.isActive({ textAlign: "center" }),
		},
		{
			icon: <AlignRight className="size-4" />,
			onClick: () => editor.chain().focus().setTextAlign("right").run(),
			checked: editor.isActive({ textAlign: "right" }),
		},
		{
			icon: <List className="size-4" />,
			onClick: () => editor.chain().focus().toggleBulletList().run(),
			checked: editor.isActive("bulletList"),
		},
		{
			icon: <ListOrdered className="size-4" />,
			onClick: () => editor.chain().focus().toggleOrderedList().run(),
			checked: editor.isActive("orderedList"),
		},
		{
			icon: <Code className="size-4" />,
			onClick: () => editor.chain().focus().toggleCodeBlock().run(),
			checked: editor.isActive("code"),
		},
		{
			icon: <Highlighter className="size-4" />,
			onClick: () => editor.chain().focus().toggleHighlight().run(),
			checked: editor.isActive("highlight"),
		},
		{
			icon: <Upload className="size-4" />,
			onClick: () => addImage(),
			checked: editor.isActive("image"),
		},
	]

	return (
		<div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50">
			{Options.map((option, i) => (
				<Switch
					key={i}
					size="sm"
					checked={option.checked} // Replaces `checked`
					onChange={option.onClick} // Switch's state change handler
					icon={option.icon} // Icon for the Switch
				/>
			))}
		</div>
	)
}
