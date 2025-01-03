"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import AddTaskDialog from "@/src/components/dialogs/AddTaskDialog"
import Filters from "@/src/components/Filters"
import TaskItem from "@/src/components/TaskItem"
import { useAnimations } from "@/src/hooks/useAnimations"
import { useState } from "react"

export default function Home() {
	const { filteredTasks } = useTasks()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const isFlashing = useAnimations(1000)

	const handleDialogClose = () => {
		setIsDialogOpen(false)
	}

	return (
		<div className="card min-h-screen">
			<div className="flex flex-row items-center justify-between gap-2">
				<h2 className="hidden md:block">All Tasks</h2>
				<Filters />
			</div>

			<div className="my-4 grid grid-cols-1 place-items-center gap-4 md:grid-cols-4">
				{filteredTasks.map((task: Task) => (
					<TaskItem key={task.id} task={task} isFlashing={isFlashing} />
				))}

				<button
					className={`size-56 rounded-2xl border-2 border-dashed border-border py-2 text-lg font-medium text-muted-foreground hover:bg-secondary ${
						isFlashing ? "animate-flash" : ""
					}`}
					onClick={() => setIsDialogOpen(true)}
				>
					Add New Task
				</button>
			</div>

			<AddTaskDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
		</div>
	)
}
