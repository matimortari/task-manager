"use client"

import TaskItem from "@/src/components/TaskItem"
import { useAnimations } from "@/src/hooks/useAnimations"
import { useTaskActions } from "@/src/hooks/useTaskActions"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Completed() {
	const { data: session } = useSession()
	const { filterTasks } = useTaskActions()
	const completedTasks = filterTasks("completed")
	const isFlashing = useAnimations(1000)

	if (!session) {
		return (
			<div className="card m-2 flex min-h-screen items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<Icon icon="mdi:account-badge-warning" className="size-16 text-accent" />
					<h2 className="text-xl font-semibold">You are not signed in yet.</h2>
					<h3 className="text-base text-muted-foreground">
						Please{" "}
						<Link href="/login" className="font-bold text-primary">
							sign in{" "}
						</Link>
						to view and manage your tasks now :)
					</h3>
				</div>
			</div>
		)
	}

	return (
		<div className="card m-2 min-h-screen">
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
