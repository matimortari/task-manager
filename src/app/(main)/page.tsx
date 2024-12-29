"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import Filters from "@/src/components/Filters"
import TaskItem from "@/src/components/TaskItem"

export default function Home() {
	const { tasks } = useTasks()

	return (
		<div className="card min-h-screen">
			<Filters />
			<div className="my-4 grid grid-cols-3 gap-4">
				{tasks.map((task: Task, i: number) => (
					<TaskItem key={i} task={task} />
				))}
			</div>
		</div>
	)
}
