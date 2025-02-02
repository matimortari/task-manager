"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import AddTaskDialog from "@/src/components/dialogs/AddTaskDialog"
import Filters from "@/src/components/Filters"
import SignInPrompt from "@/src/components/SignInPrompt"
import TaskItem from "@/src/components/TaskItem"
import { useAnimations } from "@/src/hooks/useAnimations"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function Home() {
	const { data: session } = useSession()
	const { filteredTasks } = useTasks()

	const isFlashing = useAnimations(1000)

	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleDialogClose = () => setIsDialogOpen(false)

	if (!session) {
		return <SignInPrompt />
	}

	return (
		<div className="card m-2 min-h-screen w-full">
			<header className="flex flex-row items-center justify-between gap-2">
				<h2 className="text-xl font-semibold">All Tasks</h2>
				<Filters />
			</header>

			{filteredTasks.length === 0 ? (
				<div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
					<Icon icon="solar:sleeping-square-bold" className="size-16 text-accent" />
					<h2 className="text-xl font-semibold">No tasks yet.</h2>
					<h3 className="text-base text-muted-foreground">
						You have no tasks yet. To get started, click{" "}
						<button onClick={() => setIsDialogOpen(true)} className="font-bold text-primary">
							here.
						</button>
					</h3>
				</div>
			) : (
				<div className="my-4 grid grid-cols-1 place-items-center gap-4 md:grid-cols-4">
					{filteredTasks.map((task) => (
						<TaskItem key={task.id} task={task} isFlashing={isFlashing} />
					))}

					<button
						className={`h-56 w-full rounded-2xl border-2 border-dashed border-border text-lg font-medium text-muted-foreground hover:bg-secondary md:size-56 ${
							isFlashing ? "animate-flash" : ""
						}`}
						onClick={() => setIsDialogOpen(true)}
					>
						Add New Task
					</button>
				</div>
			)}

			<AddTaskDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
		</div>
	)
}
