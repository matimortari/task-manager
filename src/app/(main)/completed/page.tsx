"use client"

import TaskItem from "@/src/components/TaskItem"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Completed() {
	const { filterTasks } = useTaskActions()

	const completedTasks = filterTasks("completed")

	return (
		<div className="card min-h-screen">
			<h2 className="mb-4 text-2xl font-bold">Completed Tasks</h2>

			<div className="my-4 grid grid-cols-3 gap-4">
				{completedTasks.length === 0 ? (
					<p>No completed tasks</p>
				) : (
					completedTasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
				)}
			</div>
		</div>
	)
}
