"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import TaskItem from "@/src/components/TaskItem"

export default function Pending() {
	const { tasks } = useTasks()

	// Get the current date
	const currentDate = new Date()

	// Filter tasks that are pending (i.e., tasks that are not completed and not overdue)
	const pendingTasks = tasks.filter((task) => {
		const dueDate = new Date(task.dueDate)
		return !task.completed && dueDate >= currentDate // Only include tasks that are not completed and their due date is today or in the future
	})

	return (
		<div className="card flex h-screen flex-col items-center overflow-auto">
			<h2 className="mb-4 text-2xl font-bold">Pending Tasks</h2>
			<div className="my-4 grid grid-cols-3 gap-4">
				{pendingTasks.length === 0 ? (
					<p>No pending tasks</p>
				) : (
					pendingTasks.map((task) => <TaskItem key={task.id} task={task} />)
				)}
			</div>
		</div>
	)
}
