"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import Image from "next/image"

function StatCard({ label, value }) {
	return (
		<div className="flex flex-row border-l-2 border-accent px-2 text-xs">
			<p className="flex flex-col font-semibold text-muted-foreground">
				{label}
				<span className="text-lg font-bold text-foreground">{value}</span>
			</p>
		</div>
	)
}

export default function Profile() {
	const { data: session, status } = useSession()

	const { tasks, activeTasks, completedTasks, overdueTasks, deleteTask } = useTasks()

	const handleDeleteTasks = () => {
		if (window.confirm("Are you sure you want to delete all tasks? This action cannot be undone.")) {
			deleteTask()
		}
	}

	if (status !== "authenticated") {
		return null
	}

	return (
		<div className="card relative m-2 flex w-full flex-col">
			{session?.user?.image ? (
				<header className="flex h-10 flex-row items-center justify-between gap-2">
					<h3 className="font-bold">My Tasks</h3>
					<Image
						src={session.user.image}
						alt={session.user.name || "Guest"}
						width={40}
						height={40}
						className="rounded-full"
					/>
				</header>
			) : (
				<header className="size-10 rounded-full bg-background" />
			)}

			<hr className="my-2 w-full" />

			<div className="grid grid-cols-4 gap-4 md:grid-cols-2">
				<StatCard label="Completed" value={completedTasks.length} />
				<StatCard label="Active" value={activeTasks.length} />
				<StatCard label="Overdue" value={overdueTasks.length} />
				<StatCard label="Total" value={tasks.length} />
			</div>

			<div className="absolute bottom-1 right-2">
				<button onClick={handleDeleteTasks}>
					<Icon icon="mdi:close-circle" className="icon size-8 text-danger" />
				</button>
			</div>
		</div>
	)
}
