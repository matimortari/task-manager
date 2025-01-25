"use client"

import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import RadialChart from "./RadialChart"
import { useTasks } from "./context/TaskContext"

export default function Sidebar() {
	const { data: session } = useSession()
	const { deleteTask } = useTasks()

	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsVisible(false)
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		if (isVisible) {
			document.documentElement.style.overflow = "hidden"
		} else {
			document.documentElement.style.overflow = ""
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = "" // Ensure scroll is restored on cleanup
		}
	}, [isVisible])

	const toggleSidebar = () => {
		setIsVisible((prev) => !prev)
	}

	const deleteAllTasks = async () => {
		try {
			await deleteTask()
		} catch (error) {
			console.error("Error deleting all tasks", error)
		}
	}

	if (!session) {
		return null
	}

	return (
		<div className="my-6 flex h-full flex-col items-center gap-4">
			{!isVisible && (
				<button className="btn fixed bottom-16 z-20 transform bg-primary text-lg md:hidden" onClick={toggleSidebar}>
					Manage Tasks
				</button>
			)}

			<div
				className={`w-full transition-all duration-300 ${
					isVisible ? "block" : "hidden"
				} fixed left-0 top-0 z-10 h-screen w-full bg-background md:relative md:block md:size-auto`}
			>
				<button className="absolute right-4 top-4 p-2 md:hidden" onClick={toggleSidebar}>
					<Icon icon="mdi:close" className="size-8" />
				</button>

				<div className="flex h-full flex-col items-center justify-center gap-8 md:items-start md:justify-start">
					<h2 className="block md:hidden">Manage Tasks</h2>

					<div className="mx-4 flex flex-col items-center justify-between gap-4">
						<Profile />
						<button
							className="btn bg-danger"
							onClick={() => {
								if (window.confirm("Are you sure you want to delete all tasks? This action cannot be undone.")) {
									deleteAllTasks()
								}
							}}
						>
							Delete All Tasks
						</button>
					</div>

					<div className="mx-4 flex items-center justify-between md:mb-28">
						<RadialChart />
					</div>
				</div>
			</div>
		</div>
	)
}
