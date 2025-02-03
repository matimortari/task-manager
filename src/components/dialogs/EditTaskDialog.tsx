"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import useDialog from "@/src/hooks/useDialog"
import { useEffect, useState } from "react"

export default function EditTaskDialog({ isOpen, onClose, task }) {
	const { dialogRef, error, setError } = useDialog(onClose, isOpen)
	const { updateTask } = useTasks()

	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [dueDate, setDueDate] = useState("")
	const [priority, setPriority] = useState("low")
	const [status, setStatus] = useState("active")

	useEffect(() => {
		if (isOpen && task) {
			setTitle(task.title)
			setContent(task.content)
			setDueDate(task.dueDate || "")
			setPriority(task.priority || "low")
			setStatus(task.status || "active")
			setError(null)
		}
	}, [isOpen, task, setError])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!title || !content) {
			setError("Title and content are required")
			return
		}

		const updatedTask = {
			id: task.id,
			title,
			content,
			dueDate,
			priority,
			status,
			completed: task.completed
		}

		updateTask(updatedTask)
		onClose()
	}

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
			setter(e.target.value)
		}

	if (!isOpen) return null

	return (
		<div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
			<div ref={dialogRef} className="popover">
				<h3>Edit Task</h3>

				{error && <h4 className="text-danger">{error}</h4>}

				<form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
					<div className="input-group">
						<label htmlFor="title" className="w-24 text-sm">
							Title:
						</label>
						<input
							id="title"
							type="text"
							value={title}
							onChange={handleChange(setTitle)}
							className="input w-full text-sm"
							required
						/>
					</div>

					<div className="input-group">
						<label htmlFor="content" className="w-24 text-sm">
							Content:
						</label>
						<textarea
							id="content"
							value={content}
							onChange={handleChange(setContent)}
							className="input h-24 w-full text-sm"
							required
						/>
					</div>

					<div className="input-group">
						<label htmlFor="dueDate" className="w-24 text-sm">
							Due Date:
						</label>
						<input
							id="dueDate"
							type="date"
							value={dueDate}
							onChange={handleChange(setDueDate)}
							className="input w-full text-sm"
						/>
					</div>

					<div className="input-group">
						<label htmlFor="priority" className="w-24 text-sm">
							Priority:
						</label>
						<select
							id="priority"
							value={priority}
							onChange={handleChange(setPriority)}
							className="input w-full text-sm"
						>
							<option value="low">Low</option>
							<option value="normal">Normal</option>
							<option value="high">High</option>
						</select>
					</div>

					<div className="input-group">
						<label htmlFor="status" className="w-24 text-sm">
							Status:
						</label>
						<select id="status" value={status} onChange={handleChange(setStatus)} className="input w-full text-sm">
							<option value="active">Active</option>
							<option value="completed">Completed</option>
						</select>
					</div>

					<div className="input-group">
						<button type="submit" className="btn bg-primary">
							Submit
						</button>
						<button type="button" onClick={onClose} className="btn bg-danger">
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
