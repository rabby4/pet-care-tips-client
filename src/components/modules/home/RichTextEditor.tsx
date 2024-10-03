"use client"
import { useState } from "react"
import { Card } from "@nextui-org/card"
import { Button } from "@nextui-org/button"

export default function RichTextEditor() {
	const [content, setContent] = useState<string>("")

	// Executes the command for formatting (e.g., bold, italic, etc.)
	const handleCommand = (command: string) => {
		document.execCommand(command, false)
	}

	const handleLink = () => {
		const url = prompt("Enter the URL")
		if (url) {
			document.execCommand("createLink", false, url)
		}
	}

	const handleContentChange = (e: any) => {
		setContent(e.target.innerHTML) // Update state as content changes
	}

	return (
		<Card className="p-4">
			<h3>Rich Text Editor</h3>
			{/* Toolbar */}
			<div className="toolbar mb-4 space-x-2">
				<Button size="sm" onClick={() => handleCommand("bold")}>
					Bold
				</Button>
				<Button size="sm" onClick={() => handleCommand("italic")}>
					Italic
				</Button>
				<Button size="sm" onClick={() => handleCommand("underline")}>
					Underline
				</Button>
				<Button size="sm" onClick={handleLink}>
					Insert Link
				</Button>
				<Button size="sm" onClick={() => handleCommand("insertUnorderedList")}>
					Bullet List
				</Button>
				<Button size="sm" onClick={() => handleCommand("insertOrderedList")}>
					Numbered List
				</Button>
			</div>

			{/* Rich Text Editor Area */}

			<form
				className="editor border rounded-md p-3 min-h-[150px] bg-slate-50"
				contentEditable
				dangerouslySetInnerHTML={{ __html: content }}
				onInput={handleContentChange}
				dir="ltr"
			></form>
		</Card>
	)
}
