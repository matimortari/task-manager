"use client"

import TaskItem from "@/src/components/TaskItem"
import { useAnimations } from "@/src/hooks/useAnimations"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Completed() {
	const { filterTasks } = useTaskActions()

	const completedTasks = filterTasks("completed")

	const isFlashing = useAnimations(1000)

	return (
		<div className="card min-h-screen">
			<h2>Completed Tasks</h2>

			<div className="my-4 grid grid-cols-1 place-items-center gap-4 md:grid-cols-4">
				{completedTasks.length === 0 ? (
					<p>No completed tasks</p>
				) : (
					completedTasks.map((task: Task) => <TaskItem key={task.id} task={task} isFlashing={isFlashing} />)
				)}
			</div>
		</div>
	)
}
