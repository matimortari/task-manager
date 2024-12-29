"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import Filters from "@/src/components/Filters"
import TaskItem from "@/src/components/TaskItem"

export default function Home() {
	const { tasks } = useTasks()

	return (
		<div className="card h-screen">
			<Filters />
			<div className="mt-6 grid grid-cols-3 gap-6 pb-8">
				{tasks.map((task: Task, i: number) => (
					<TaskItem key={i} task={task} />
				))}
			</div>
		</div>
	)
}
