import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getTasks } from "../lib/actions"

export default function Profile() {
	const { data: session } = useSession()
	const [tasks, setTasks] = useState([])

	useEffect(() => {
		getTasks().then((data) => {
			setTasks(data)
		})
	}, [])

	return (
		<div className="card flex items-center gap-8">
			<Image
				src={session?.user?.image || "/default-profile.png"}
				alt="Profile Picture"
				width={40}
				height={40}
				className="rounded-full"
			/>

			<div className="flex flex-col gap-8">
				<div className="grid grid-cols-2 gap-4 text-xs">
					<div className="flex flex-row border-l-2 border-primary px-1">
						<p className="flex flex-col text-muted-foreground">
							In Progress
							<span className="font-bold text-foreground"> {tasks.length} </span>
						</p>
					</div>

					<div className="flex flex-row border-l-2 border-primary px-1 text-xs">
						<p className="flex flex-col text-muted-foreground">
							Open Tasks
							<span className="font-bold text-foreground"> {tasks.length} </span>
						</p>
					</div>

					<div className="flex flex-row border-l-2 border-primary px-1 text-xs">
						<p className="flex flex-col text-muted-foreground">
							Completed
							<span className="font-bold text-foreground"> {tasks.length} </span>
						</p>
					</div>

					<div className="flex flex-row border-l-2 border-primary px-1 text-xs">
						<p className="flex flex-col text-muted-foreground">
							Total Tasks
							<span className="font-bold text-foreground"> {tasks.length} </span>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
