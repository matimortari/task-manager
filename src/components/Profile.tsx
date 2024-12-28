import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getTasks } from "../lib/actions"

function StatCard({ label, value }) {
	return (
		<div className="flex flex-row border-l-2 border-primary px-1 text-xs">
			<p className="flex flex-col text-muted-foreground">
				{label}
				<span className="font-bold text-foreground">{value}</span>
			</p>
		</div>
	)
}

export default function Profile() {
	const { data: session } = useSession()
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		async function fetchTasks() {
			const data = await getTasks()
			setTasks(data)
		}
		fetchTasks()
	}, [])

	const userImage = session?.user?.image
	const userName = session?.user?.name || ""

	return (
		<div className="card flex items-center gap-12">
			{session && (
				<div>
					{userImage ? (
						<Image src={userImage} alt={userName} width={40} height={40} className="rounded-full" />
					) : (
						<div className="size-10 rounded-full bg-primary" />
					)}
				</div>
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
