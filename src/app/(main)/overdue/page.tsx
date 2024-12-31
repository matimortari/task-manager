"use client"

import TaskItem from "@/src/components/TaskItem"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Overdue() {
	const { filterTasks, handleEditTask, handleDeleteTask } = useTaskActions()

	const overdueTasks = filterTasks("overdue")

	return (
		<div className="card min-h-screen">
			<h2 className="mb-4 text-2xl font-bold">Overdue Tasks</h2>

			<div className="my-4 grid grid-cols-3 gap-4">
				{overdueTasks.length === 0 ? (
					<p>No overdue tasks</p>
				) : (
					overdueTasks.map((task: Task) => (
						<TaskItem key={task.id} task={task} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
					))
				)}
			</div>
		</div>
	)
}
