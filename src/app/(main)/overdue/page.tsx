"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import SignInPrompt from "@/src/components/SignInPrompt"
import TaskItem from "@/src/components/TaskItem"
import { useAnimations } from "@/src/hooks/useAnimations"
import { useTaskActions } from "@/src/hooks/useTaskActions"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"

export default function Overdue() {
	const { data: session } = useSession()
	const { filteredTasks } = useTasks()
	const { filterTasks } = useTaskActions()
	const overdueTasks = filterTasks("overdue")

	const isFlashing = useAnimations(1000)

	if (!session) {
		return <SignInPrompt />
	}

	if (filteredTasks.length === 0) {
		return (
			<div className="card m-2 min-h-screen">
				<header className="flex flex-row items-center justify-between gap-2">
					<h2 className="text-xl font-semibold">Overdue Tasks</h2>
				</header>
				<div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
					<Icon icon="solar:sleeping-square-bold" className="size-16 text-accent" />
					<h2 className="text-xl font-semibold">No tasks yet.</h2>
					<h3 className="text-base text-muted-foreground">You have no tasks yet.</h3>
				</div>
			</div>
		)
	}

	if (overdueTasks.length === 0) {
		return (
			<div className="card m-2 min-h-screen w-full">
				<header className="flex flex-row items-center justify-between gap-2">
					<h2 className="text-xl font-semibold">Overdue Tasks</h2>
				</header>
				<div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
					<Icon icon="tdesign:task-checked-filled" className="size-16 text-accent" />
					<h2 className="text-xl font-semibold">No overdue tasks.</h2>
					<h3 className="text-base text-muted-foreground">
						You have no tasks that are overdue. Keep up the good work!
					</h3>
				</div>
			</div>
		)
	}

	return (
		<div className="card m-2 min-h-screen">
			<header className="flex flex-row items-center justify-between gap-2">
				<h2 className="text-xl font-semibold">Overdue Tasks</h2>
			</header>
			<div className="my-4 grid grid-cols-1 place-items-center gap-6 md:grid-cols-4">
				{overdueTasks.map((task) => (
					<TaskItem key={task.id} task={task} isFlashing={isFlashing} />
				))}
			</div>
		</div>
	)
}
