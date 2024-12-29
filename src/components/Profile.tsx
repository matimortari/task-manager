"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getTasks } from "../lib/actions"

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
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		if (status === "authenticated") {
			fetchTasks()
		}
	}, [status])

	async function fetchTasks() {
		const data = await getTasks()
		setTasks(data)
	}

	if (status !== "authenticated") {
		return null
	}

	const userImage = session?.user?.image
	const userName = session?.user?.name || ""

	return (
		<div className="card flex flex-row items-center gap-12">
			{/* Only render the image if the user has a profile image */}
			{userImage ? (
				<Image src={userImage} alt={userName} width={40} height={40} className="rounded-full" />
			) : (
				<div className="size-10 rounded-full bg-background" />
			)}

			<div className="grid grid-cols-2 gap-4 text-xs">
				<StatCard label="In Progress" value={tasks.length} />
				<StatCard label="Open Tasks" value={tasks.length} />
				<StatCard label="Completed" value={tasks.length} />
				<StatCard label="Total Tasks" value={tasks.length} />
			</div>
		</div>
	)
}
