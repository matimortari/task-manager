"use client"

import { Icon } from "@iconify/react"
import { formatDate } from "../lib/utils"

const TaskPriorityLabels = {
	low: "Low",
	normal: "Normal",
	high: "High"
}

export default function TaskItem({ task, handleEditTask, handleDeleteTask }) {
	return (
		<div className="flex h-auto flex-col gap-6 rounded-2xl bg-background p-4">
			<div className="flex flex-row items-center justify-between gap-4">
				<h3 className="text-lg font-bold">{task.title}</h3>
				<div className="flex flex-row gap-2">
					<button onClick={() => handleEditTask(task)}>
						<Icon icon="mdi:edit" className="size-5 text-primary" />
					</button>
					<button onClick={() => handleDeleteTask(task.id)}>
						<Icon icon="mdi:delete" className="size-5 text-destructive" />
					</button>
				</div>
			</div>

			<p className="text-sm text-muted-foreground">{task.content}</p>

			<div className="flex flex-col gap-1">
				<p className="text-xs">
					Due Date: <span className="font-semibold text-muted-foreground">{formatDate(task.dueDate)}</span>
				</p>
				<p className="text-xs">
					Status:{" "}
					<span className={`font-semibold ${task.completed ? "text-secondary" : "text-primary"}`}>
						{task.completed ? "Completed" : "Active"}
					</span>
				</p>
				<p className="text-xs">
					Priority: <span className="font-semibold">{TaskPriorityLabels[task.priority] || "Unknown"}</span>
				</p>
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-xs">
					Created At: <span className="font-semibold text-muted-foreground">{formatDate(task.createdAt)}</span>
				</p>
				<p className="text-xs">
					Updated At: <span className="font-semibold text-muted-foreground">{formatDate(task.updatedAt)}</span>
				</p>
			</div>
		</div>
	)
}
