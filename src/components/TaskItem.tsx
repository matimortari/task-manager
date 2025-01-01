"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"
import { formatDate } from "../lib/utils"
import { useTasks } from "./context/TaskContext"
import EditTaskDialog from "./dialogs/EditTaskDialog"

export default function TaskItem({ task, isFlashing }) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const { toggleTaskStatus, deleteTask } = useTasks()

	const handleDialogClose = () => {
		setIsDialogOpen(false)
	}

	const handleToggleCompletion = async () => {
		await toggleTaskStatus(task.id, !task.completed)
	}

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			await deleteTask(task.id)
		}
	}

	return (
		<div
			className={`relative flex size-64 w-full flex-col gap-6 rounded-2xl bg-background p-4 transition-all duration-500 ease-in-out ${
				isFlashing ? "animate-flash" : ""
			}`}
		>
			<div className="flex flex-row items-center justify-between gap-2">
				<h3 className="truncate text-lg font-bold">{task.title}</h3>
			</div>

			<p className="truncate text-sm text-muted-foreground">{task.content}</p>

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
					Priority: <span className="font-semibold">{task.priority}</span>
				</p>
			</div>

			<div className="absolute bottom-3 right-3 flex gap-2">
				<button onClick={handleToggleCompletion}>
					{task.completed ? (
						<Icon icon="mdi:play" className="icon size-5 text-foreground hover:text-muted" />
					) : (
						<Icon icon="mdi:check" className="icon size-5 text-foreground hover:text-muted" />
					)}
				</button>

				<button onClick={() => setIsDialogOpen(true)}>
					<Icon icon="mdi:edit" className="icon size-5 text-primary hover:text-muted" />
				</button>

				<button onClick={handleDelete}>
					<Icon icon="mdi:delete" className="icon size-5 text-destructive hover:text-muted" />
				</button>
			</div>

			<EditTaskDialog isOpen={isDialogOpen} onClose={handleDialogClose} task={task} />
		</div>
	)
}
