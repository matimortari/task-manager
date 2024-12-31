"use client"

import TaskItem from "@/src/components/TaskItem"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Overdue() {
	const { filterTasks } = useTaskActions()

	const overdueTasks = filterTasks("overdue")

	return (
		<div className="card min-h-screen">
			<h2 className="title">Overdue Tasks</h2>

			<div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-3">
				{overdueTasks.length === 0 ? (
					<p>No overdue tasks</p>
				) : (
					overdueTasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
				)}
			</div>
		</div>
	)
}
