"use client"

import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Profile from "./Profile"
import RadialChart from "./RadialChart"

export default function Sidebar() {
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
		<div className="my-6 flex h-full flex-col items-center gap-4">
			{/* Mobile toggle button */}
			{!isVisible && (
				<button className="btn fixed bottom-16 z-20 transform bg-primary text-lg md:hidden" onClick={toggleSidebar}>
					Manage Tasks
				</button>
			)}

			<div
				className={`w-full transition-all duration-300 ${
					isVisible ? "block" : "hidden"
				} fixed left-0 top-0 z-10 h-screen w-full rounded-2xl bg-background p-4 md:relative md:block md:size-auto`}
			>
				<button className="absolute right-4 top-4 p-2 md:hidden" onClick={toggleSidebar}>
					<Icon icon="mdi:close" className="size-8" />
				</button>

				<div className="flex h-full flex-col items-center justify-center gap-4 md:justify-start">
					<h2 className="block md:hidden">Manage Tasks</h2>

					<div className="mx-4 flex flex-col items-center justify-center gap-4">
						<Profile />
					</div>

					<RadialChart />
				</div>
			</div>
		</div>
	)
}
