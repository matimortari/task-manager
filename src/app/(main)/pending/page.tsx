"use client"

import TaskItem from "@/src/components/TaskItem"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Pending() {
	const { filterTasks, handleEditTask, handleDeleteTask } = useTaskActions()

	const pendingTasks = filterTasks("pending")

	return (
		<div className="card flex h-screen flex-col items-center overflow-auto">
			<h2 className="mb-4 text-2xl font-bold">Pending Tasks</h2>
			<div className="my-4 grid grid-cols-3 gap-4">
				{pendingTasks.length === 0 ? (
					<p>No pending tasks</p>
				) : (
					pendingTasks.map((task) => (
						<TaskItem key={task.id} task={task} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
					))
				)}
			</div>
		</div>
	)
}
