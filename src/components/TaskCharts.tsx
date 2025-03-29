"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import { getColorForCompletion, getColorforPriority } from "@/src/lib/utils"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis } from "recharts"

const renderActiveShape = (props: any) => {
	const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

	return (
		<g>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
		</g>
	)
}

function TaskCompletionChart({ completedTasks, activeTasks }) {
	const [activeIndex, setActiveIndex] = useState(0)

	const chartData = [
		{ name: "Completed", value: completedTasks },
		{ name: "Active", value: activeTasks }
	]

	const onPieEnter = (_: any, index: number) => {
		setActiveIndex(index)
	}

	return (
		<ResponsiveContainer width="100%" height={180}>
			<PieChart>
				<Pie
					activeIndex={activeIndex}
					activeShape={renderActiveShape}
					data={chartData}
					cx="50%"
					cy="50%"
					innerRadius={50}
					outerRadius={70}
					fill="#8884d8"
					dataKey="value"
					onMouseEnter={onPieEnter}
				>
					{chartData.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={getColorForCompletion(entry.name)} />
					))}
				</Pie>

				<Tooltip
					cursor={false}
					wrapperClassName="popover text-sm font-semibold"
					contentStyle={{ backgroundColor: "var(--background)" }}
					itemStyle={{ color: "var(--foreground)" }}
				/>
			</PieChart>
		</ResponsiveContainer>
	)
}

function TaskPriorityChart({ priorityCounts }: Readonly<{ priorityCounts: Record<string, number> }>) {
	const priorities = ["Low", "Normal", "High"]

	return (
		<ResponsiveContainer width="100%" height={180}>
			<BarChart
				data={priorities.map((priorityLevel) => ({
					name: priorityLevel,
					value: priorityCounts[priorityLevel] || 0
				}))}
			>
				<XAxis dataKey="name" className="text-xs" />

				<Bar dataKey="value" name="Tasks" radius={[10, 10, 0, 0]}>
					{priorities.map((priorityLevel, index) => (
						<Cell key={`cell-${index}`} fill={getColorforPriority(priorityLevel)} />
					))}
				</Bar>

				<Tooltip
					cursor={false}
					wrapperClassName="popover text-sm font-semibold"
					contentStyle={{ backgroundColor: "var(--background)" }}
					labelStyle={{ color: "var(--accent)" }}
					itemStyle={{ color: "var(--foreground)" }}
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default function TaskCharts() {
	const { status } = useSession()

	const { tasks, activeTasks, completedTasks, priority } = useTasks()

	const priorities = ["Low", "Normal", "High"]

	const filteredTasks = priority === "all" ? tasks : tasks.filter((task) => task.priority === priority)

	const priorityCounts = priorities.reduce((acc, priorityLevel) => {
		acc[priorityLevel] = filteredTasks.filter((task) => task.priority === priorityLevel.toLowerCase()).length
		return acc
	}, {})

	if (status !== "authenticated") {
		return null
	}

	return (
		<div className="card flex w-full flex-col items-center">
			<div className="flex w-full flex-col items-center gap-2">
				<h3>Task Completion</h3>

				<TaskCompletionChart completedTasks={completedTasks.length} activeTasks={activeTasks.length} />
			</div>

			<hr className="my-2 w-full" />

			<div className="flex w-full flex-col items-center gap-2">
				<h3>Tasks By Priority</h3>

				<TaskPriorityChart priorityCounts={priorityCounts} />
			</div>
		</div>
	)
}
