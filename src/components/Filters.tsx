"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import { useState } from "react"

export default function Filters() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { priority, setPriority } = useTasks()
	const [activeIndex, setActiveIndex] = useState(0)
	const priorities = ["All", "Low", "Medium", "High"]

	return (
		<div className="relative grid grid-cols-4 items-center gap-3 rounded-md border p-2">
			<span
				className="absolute left-[5px] rounded-md bg-background transition-all duration-300"
				style={{
					width: "calc(100% / 4 - 10px)",
					height: "calc(100% - 10px)",
					top: "50%",
					transform: `translate(calc(${activeIndex * 100}% + ${activeIndex * 10}px), -50%)`,
					transition: "transform 300ms cubic-bezier(.95,.03,1,1)"
				}}
			></span>
			{priorities.map((priority, index) => (
				<button
					key={index}
					className={`relative z-10 px-1 text-sm font-medium ${
						activeIndex === index ? "text-accent-foreground " : "text-muted-foreground"
					}`}
					onClick={() => {
						setActiveIndex(index)
						setPriority(priority.toLowerCase())
					}}
				>
					{priority}
				</button>
			))}
		</div>
	)
}
