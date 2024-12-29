"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import TaskItem from "@/src/components/TaskItem"

export default function Overdue() {
	const { tasks } = useTasks()

	// Get the current date
	const currentDate = new Date()

	// Filter tasks that are overdue (i.e., tasks with dueDate before today and not completed)
	const overdueTasks = tasks.filter((task) => {
		const dueDate = new Date(task.dueDate)
		return dueDate < currentDate && !task.completed // Only include overdue tasks that are not completed
	})

	return (
		<div className="card flex h-screen flex-col items-center overflow-auto">
			<h2 className="mb-4 text-2xl font-bold">Overdue Tasks</h2>
			<div className="my-4 grid grid-cols-3 gap-4">
				{overdueTasks.length === 0 ? (
					<p>No overdue tasks</p>
				) : (
					overdueTasks.map((task) => <TaskItem key={task.id} task={task} />)
				)}
			</div>
		</div>
	)
}
