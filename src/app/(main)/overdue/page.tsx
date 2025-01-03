"use client"

import TaskItem from "@/src/components/TaskItem"
import { useAnimations } from "@/src/hooks/useAnimations"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Overdue() {
	const { filterTasks } = useTaskActions()
	const overdueTasks = filterTasks("overdue")

	const isFlashing = useAnimations()

	return (
		<div className="card min-h-screen">
			<h2>Overdue Tasks</h2>

			<div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-3">
				{overdueTasks.length === 0 ? (
					<p>No overdue tasks</p>
				) : (
					overdueTasks.map((task: Task) => <TaskItem key={task.id} task={task} isFlashing={isFlashing} />)
				)}
			</div>
		</div>
	)
}
