"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"
import { capitalize, formatDate } from "../lib/utils"
import { useTasks } from "./context/TaskContext"
import EditTaskDialog from "./dialogs/EditTaskDialog"

export default function TaskItem({ task, isFlashing }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const { toggleTaskStatus, deleteTask } = useTasks()

	const handleDialogClose = () => {
		setIsDialogOpen(false)
	}

	const handleToggleCompletion = async () => {
		toggleTaskStatus(task.id, !task.completed)
	}

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			deleteTask(task.id)
		}
	}

	return (
		<div
			className={`relative flex size-56 flex-col gap-6 rounded-2xl bg-background p-4 transition-all duration-500 ease-in-out ${
				isFlashing ? "animate-flash" : ""
			}`}
		>
			<div className="flex flex-row items-center justify-between gap-2">
				<h4 className="truncate font-bold">{task.title}</h4>
			</div>

			{/* Task content with fixed height and truncation */}
			<p className="line-clamp-3 h-16 overflow-hidden text-sm text-muted-foreground">{task.content}</p>

			<div className="flex flex-col gap-1 text-xs">
				<p>
					Due Date: <span className="font-semibold text-muted-foreground">{formatDate(task.dueDate)}</span>
				</p>
				<p>
					Status:
					<span className={`font-semibold ${task.completed ? "text-accent" : "text-primary"}`}>
						{task.completed ? " Completed" : " Active"}
					</span>
				</p>
				<p>
					Priority: <span className="font-semibold">{capitalize(task.priority)}</span>
				</p>
			</div>

			<div className="absolute bottom-2 right-2 flex gap-1">
				<button onClick={handleToggleCompletion}>
					{task.completed ? (
						<Icon icon="mdi:arrow-right-drop-circle" className="icon size-6 text-foreground hover:text-muted" />
					) : (
						<Icon icon="mdi:check-circle" className="icon size-6 text-foreground hover:text-muted" />
					)}
				</button>

				<button onClick={() => setIsDialogOpen(true)}>
					<Icon icon="mdi:text-box-edit" className="icon size-6 text-accent hover:text-muted" />
				</button>

				<button onClick={handleDelete}>
					<Icon icon="mdi:delete" className="icon size-6 text-danger hover:text-muted" />
				</button>
			</div>

			<EditTaskDialog isOpen={isDialogOpen} onClose={handleDialogClose} task={task} />
		</div>
	)
}
