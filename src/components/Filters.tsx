"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"

export default function Filters({ priority, setPriority }) {
	const [isOpen, setIsOpen] = useState(false)

	const priorities = ["All", "Low", "Normal", "High"]

	return (
		<div className="relative z-10">
			<div className="md:hidden">
				<button onClick={() => setIsOpen(!isOpen)} className="btn">
					<span>{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
					<Icon
						icon="mdi:chevron-down"
						className={`size-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
					/>
				</button>

				{/* Dropdown menu for mobile */}
				{isOpen && (
					<div className="popover absolute -left-16 mt-2 flex w-32 flex-col gap-4">
						{priorities.map((item) => (
							<button
								key={item}
								onClick={() => {
									setPriority(item.toLowerCase()) // Update local priority state
									setIsOpen(false)
								}}
								className={`btn block w-full transition-all duration-300 ${
									priority === item.toLowerCase() ? "bg-secondary" : "hover:bg-accent"
								}`}
							>
								{item}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Grid layout for desktop */}
			<div className="hidden items-center md:grid md:grid-cols-4 md:gap-2">
				{priorities.map((item) => (
					<button
						key={item}
						onClick={() => setPriority(item.toLowerCase())}
						className={`btn relative text-xs transition-all duration-300 ${
							priority === item.toLowerCase()
								? "scale-105 transform bg-secondary"
								: "bg-background text-muted-foreground"
						}`}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	)
}
