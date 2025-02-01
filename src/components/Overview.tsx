"use client"

import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import TaskCharts from "./TaskCharts"

export default function Overview() {
	const { data: session } = useSession()

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

	if (!session) {
		return null
	}

	return (
		<>
			{/* Mobile toggle button */}
			{!isVisible && (
				<div className="flex flex-col items-center">
					<button className="btn fixed bottom-16 z-20 transform bg-primary md:hidden" onClick={toggleSidebar}>
						Manage Tasks
					</button>
				</div>
			)}

			<div
				className={`fixed left-0 top-0 z-10 h-screen w-full bg-background py-2 transition-all duration-300 md:relative md:block md:size-auto ${
					isVisible ? "block" : "hidden"
				}`}
			>
				<button className="absolute right-4 top-4 p-2 md:hidden" onClick={toggleSidebar}>
					<Icon icon="mdi:close" className="size-8" />
				</button>

				<div className="m-6 flex flex-col items-center justify-center gap-4 md:my-0 md:justify-start">
					<h2 className="block md:hidden">Manage Tasks</h2>
					<Profile />
					<TaskCharts />
				</div>
			</div>
		</>
	)
}
