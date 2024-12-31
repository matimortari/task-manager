"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import useDialog from "@/src/hooks/useDialog"
import { useEffect, useState } from "react"

export default function AddTaskDialog({ isOpen, onClose }) {
	const { dialogRef, error, setError } = useDialog(onClose)
	const { createTask } = useTasks()

	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [dueDate, setDueDate] = useState("")
	const [priority, setPriority] = useState("low")
	const [status, setStatus] = useState("active")

	useEffect(() => {
		if (!isOpen) {
			setTitle("")
			setContent("")
			setDueDate("")
			setPriority("low")
			setStatus("active")
			setError(null)
		}
	}, [isOpen, setError])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!title || !content) {
			setError("Title and content are required")
			return
		}

		let formattedDueDate = dueDate
		if (dueDate) {
			formattedDueDate = new Date(dueDate).toISOString()
		}

		const newTask = {
			title,
			content,
			dueDate: formattedDueDate,
			priority,
			status
		}

		await createTask(newTask)
		onClose()
	}

	const handleChange = (setter) => (e) => {
		setter(e.target.value)
	}

	if (!isOpen) return null

	return (
		<div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="popover">
				<h2>Add New Task</h2>

				{error && <p style={{ color: "red" }}>{error}</p>}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label htmlFor="title">Title</label>
						<input id="title" type="text" value={title} onChange={handleChange(setTitle)} className="input" required />
					</div>
					<div>
						<label htmlFor="content">Content</label>
						<textarea id="content" value={content} onChange={handleChange(setContent)} className="input" required />
					</div>
					<div>
						<label htmlFor="dueDate">Due Date</label>
						<input id="dueDate" type="date" value={dueDate} onChange={handleChange(setDueDate)} className="input" />
					</div>
					<div>
						<label htmlFor="priority">Priority</label>
						<select id="priority" value={priority} onChange={handleChange(setPriority)} className="input">
							<option value="low">Low</option>
							<option value="normal">Normal</option>
							<option value="high">High</option>
						</select>
					</div>
					<div>
						<label htmlFor="status">Status</label>
						<select id="status" value={status} onChange={handleChange(setStatus)} className="input">
							<option value="active">Active</option>
							<option value="completed">Completed</option>
						</select>
					</div>

					<div className="flex flex-row gap-2">
						<button type="submit" className="btn bg-primary">
							Submit
						</button>
						<button type="button" onClick={onClose} className="btn bg-destructive">
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
