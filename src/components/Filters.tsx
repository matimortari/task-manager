"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import { useState } from "react"

export default function Filters() {
	const { priority, setPriority } = useTasks()
	const [activeIndex, setActiveIndex] = useState(0)
	const priorities = ["All", "Low", "Medium", "High"]

	return (
		<div className="relative grid grid-cols-4 items-center gap-4 rounded-2xl p-2">
			{priorities.map((priority, index) => (
				<button
					key={index}
					className={`btn relative z-10 text-sm transition-all duration-300 ${
						activeIndex === index ? "scale-105 transform bg-secondary " : "text-muted-foreground"
					}`}
					onClick={() => {
						setActiveIndex(index)
						setPriority(priority.toLowerCase())
					}}
					style={{
						transition: "background-color 300ms ease, transform 200ms ease"
					}}
				>
					{priority}
				</button>
			))}
		</div>
	)
}
