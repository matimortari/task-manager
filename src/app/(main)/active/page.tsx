"use client"

import TaskItem from "@/src/components/TaskItem"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Active() {
	const { filterTasks } = useTaskActions()

	const activeTasks = filterTasks("active")

	return (
		<div className="card min-h-screen">
			<h2 className="mb-4 text-2xl font-bold">Active Tasks</h2>

			<div className="my-4 grid grid-cols-3 gap-4">
				{activeTasks.length === 0 ? (
					<p>No active tasks</p>
				) : (
					activeTasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
				)}
			</div>
		</div>
	)
}
