"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import useDialog from "@/src/hooks/useDialog"
import { useEffect, useState } from "react"

export default function AddTaskDialog({ isOpen, onClose }) {
	const { dialogRef, error, setError } = useDialog(onClose, isOpen)
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

	const handleSubmit = (e: React.FormEvent) => {
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

		createTask(newTask)
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
				<h3>Add New Task</h3>

				{error && <h4 className="text-danger">{error}</h4>}

				<form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
					<div className="flex items-center gap-2">
						<label htmlFor="title" className="w-24">
							Title
						</label>
						<input
							id="title"
							type="text"
							value={title}
							onChange={handleChange(setTitle)}
							className="input w-full"
							required
						/>
					</div>

					<div className="flex items-center gap-2">
						<label htmlFor="content" className="w-24">
							Content
						</label>
						<textarea
							id="content"
							value={content}
							onChange={handleChange(setContent)}
							className="input w-full"
							required
						/>
					</div>

					<div className="flex items-center gap-2">
						<label htmlFor="dueDate" className="w-24">
							Due Date
						</label>
						<input
							id="dueDate"
							type="date"
							value={dueDate}
							onChange={handleChange(setDueDate)}
							className="input w-full"
						/>
					</div>

					<div className="flex items-center gap-2">
						<label htmlFor="priority" className="w-24">
							Priority
						</label>
						<select id="priority" value={priority} onChange={handleChange(setPriority)} className="input w-full">
							<option value="low">Low</option>
							<option value="normal">Normal</option>
							<option value="high">High</option>
						</select>
					</div>

					<div className="flex items-center gap-2">
						<label htmlFor="status" className="w-24">
							Status
						</label>
						<select id="status" value={status} onChange={handleChange(setStatus)} className="input w-full">
							<option value="active">Active</option>
							<option value="completed">Completed</option>
						</select>
					</div>

					<div className="flex flex-row gap-2">
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
