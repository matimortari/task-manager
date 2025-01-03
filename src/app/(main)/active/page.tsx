"use client"

import TaskItem from "@/src/components/TaskItem"
import { useAnimations } from "@/src/hooks/useAnimations"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Active() {
	const { filterTasks } = useTaskActions()

	const activeTasks = filterTasks("active")

	const isFlashing = useAnimations(1000)

	return (
		<div className="card min-h-screen">
			<h2>Active Tasks</h2>

			<div className="my-4 grid grid-cols-1 gap-2 md:grid-cols-3">
				{activeTasks.length === 0 ? (
					<p>No active tasks</p>
				) : (
					activeTasks.map((task: Task) => <TaskItem key={task.id} task={task} isFlashing={isFlashing} />)
				)}
			</div>
		</div>
	)
}
