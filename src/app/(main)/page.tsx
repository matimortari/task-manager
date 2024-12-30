"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import Filters from "@/src/components/Filters"
import TaskItem from "@/src/components/TaskItem"

export default function Home() {
	const { filteredTasks, handleAddTask, handleEditTask, handleDeleteTask } = useTasks()

	return (
		<div className="card min-h-screen">
			<Filters />

			<div className="my-4 grid grid-cols-3 gap-4">
				{filteredTasks.map((task) => (
					<TaskItem key={task.id} task={task} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
				))}

				<button
					className="size-64 w-full rounded-2xl border-2 border-dashed py-2 text-lg font-medium text-muted-foreground transition duration-200 ease-in-out hover:bg-secondary"
					onClick={handleAddTask}
				>
					Add New Task
				</button>
			</div>
		</div>
	)
}
