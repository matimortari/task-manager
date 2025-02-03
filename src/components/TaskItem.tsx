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
			className={`relative flex aspect-square size-full flex-col gap-4 rounded-2xl bg-background p-2 transition-all duration-500 ease-in-out md:p-4 ${
				isFlashing ? "animate-flash" : ""
			}`}
		>
			<h4 className="truncate font-bold">{task.title}</h4>

			<p className="line-clamp-2 h-10 overflow-hidden text-xs text-muted-foreground md:h-16 md:text-sm">
				{task.content}
			</p>

			<div className="flex flex-col gap-1 text-xs">
				<p>
					Due Date: <span className="font-semibold text-muted-foreground">{formatDate(task.dueDate)}</span>
				</p>
				<p>
					Status:{" "}
					<span className={`font-semibold ${task.completed ? "text-accent" : "text-primary"}`}>
						{task.completed ? "Completed" : "Active"}
					</span>
				</p>
				<p>
					Priority: <span className="font-semibold">{capitalize(task.priority)}</span>
				</p>
			</div>

			<div className="absolute bottom-2 right-2 flex gap-1">
				<button onClick={handleToggleCompletion}>
					{task.completed ? (
						<Icon icon="mdi:arrow-right-drop-circle" className="icon size-5 text-foreground hover:text-muted" />
					) : (
						<Icon icon="mdi:check-circle" className="icon size-5 text-foreground hover:text-muted" />
					)}
				</button>

				<button onClick={() => setIsDialogOpen(true)}>
					<Icon icon="mdi:text-box-edit" className="icon size-5 text-accent hover:text-muted" />
				</button>

				<button onClick={handleDelete}>
					<Icon icon="mdi:delete" className="icon size-6 text-danger hover:text-muted" />
				</button>
			</div>

			<EditTaskDialog isOpen={isDialogOpen} onClose={handleDialogClose} task={task} />
		</div>
	)
}
