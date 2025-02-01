"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useTasks } from "./context/TaskContext"

function StatCard({ label, value }) {
	return (
		<div className="flex flex-row border-l-2 border-accent px-1 text-xs">
			<p className="flex flex-col text-muted-foreground">
				{label}
				<span className="text-sm font-bold text-foreground">{value}</span>
			</p>
		</div>
	)
}

export default function Profile() {
	const { data: session, status } = useSession()

	const { tasks, activeTasks, completedTasks, overdueTasks } = useTasks()

	if (status !== "authenticated") {
		return null
	}

	return (
		<div className="card flex w-full flex-row items-start gap-6">
			{session?.user?.image ? (
				<div className="flex flex-col gap-2">
					<Image
						src={session.user.image}
						alt={session.user.name || "Guest"}
						width={40}
						height={40}
						className="rounded-full"
					/>
					<p className="text-sm font-bold">My Tasks:</p>
				</div>
			) : (
				<div className="size-10 rounded-full bg-background" />
			)}

			<div className="grid grid-cols-2 gap-6 text-xs">
				<StatCard label="Completed" value={completedTasks.length} />
				<StatCard label="Active" value={activeTasks.length} />
				<StatCard label="Overdue" value={overdueTasks.length} />
				<StatCard label="Total" value={tasks.length} />
			</div>
		</div>
	)
}
