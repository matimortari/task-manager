"use client"

import { formatDate } from "@/src/lib/utils"
import { Icon } from "@iconify/react"
import { useTasks } from "./context/TaskContext"

const TaskPriorityLabels = {
	low: "Low",
	normal: "Normal",
	high: "High"
}

export default function TaskItem({ task, handleEditTask, handleDeleteTask }) {
	const { toggleTaskStatus } = useTasks()

	const handleToggleStatus = () => {
		toggleTaskStatus(task.id, !task.completed)
	}

	return (
		<div className="relative flex size-64 w-full flex-col gap-6 rounded-2xl bg-background p-4">
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
					Priority: <span className="font-semibold">{TaskPriorityLabels[task.priority]}</span>
				</p>
			</div>

			<div className="absolute bottom-3 right-3 flex gap-2">
				<button onClick={handleToggleStatus}>
					{task.completed ? (
						<Icon icon="mdi:play" className="size-5 text-foreground" />
					) : (
						<Icon icon="mdi:check" className="size-5 text-foreground" />
					)}
				</button>
				<button onClick={() => handleEditTask(task)}>
					<Icon icon="mdi:edit" className="size-5 text-primary" />
				</button>
				<button onClick={() => handleDeleteTask(task.id)}>
					<Icon icon="mdi:delete" className="size-5 text-destructive" />
				</button>
			</div>
		</div>
	)
}
