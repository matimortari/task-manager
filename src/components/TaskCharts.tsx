"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import { useSession } from "next-auth/react"
import {
	Bar,
	BarChart,
	Label,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis
} from "recharts"

function TaskCompletionChart({
	completionPercentage,
	completedTasks,
	activeTasks
}: Readonly<{
	completionPercentage: number
	completedTasks: number
	activeTasks: number
}>) {
	const chartConfig = {
		completed: {
			label: "Completed",
			color: "#269d54"
		},
		active: {
			label: "Active",
			color: "#9d2a26"
		}
	}

	const chartData = [
		{
			active: activeTasks,
			completed: completedTasks
		}
	]

	const renderCustomLabel = (props: any) => {
		const { viewBox } = props
		if (viewBox && "cx" in viewBox && "cy" in viewBox) {
			return (
				<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
					<tspan x={viewBox.cx} y={viewBox.cy - 10} className="fill-foreground text-xl font-bold">
						{completionPercentage}%
					</tspan>
					<tspan x={viewBox.cx} y={viewBox.cy + 10} className="fill-muted-foreground text-xs">
						Completed
					</tspan>
				</text>
			)
		}
		return null
	}

	return (
		<ResponsiveContainer width="100%" height={200}>
			<RadialBarChart data={chartData} startAngle={180} endAngle={0} innerRadius={80} outerRadius={100}>
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
					<Label content={renderCustomLabel} />
				</PolarRadiusAxis>
				<RadialBar dataKey="completed" name="Completed Tasks" fill={chartConfig.completed.color} cornerRadius={5} />
				<RadialBar dataKey="active" name="Active Tasks" fill={chartConfig.active.color} cornerRadius={5} />

				<Tooltip
					wrapperClassName="popover text-xs"
					labelClassName="text-foreground font-semibold hidden"
					contentStyle={{ backgroundColor: "var(--background)", border: "none" }}
				/>
			</RadialBarChart>
		</ResponsiveContainer>
	)
}

function TaskPriorityChart({ priorityCounts }: Readonly<{ priorityCounts: Record<string, number> }>) {
	const priorities = ["Low", "Normal", "High"]

	return (
		<ResponsiveContainer width="100%" height={200}>
			<BarChart
				data={priorities.map((priorityLevel) => ({
					name: priorityLevel,
					value: priorityCounts[priorityLevel] || 0
				}))}
			>
				<XAxis dataKey="name" className="text-xs" />
				<Tooltip
					wrapperClassName="popover text-xs"
					labelClassName="text-foreground font-semibold"
					contentStyle={{ backgroundColor: "var(--background)", border: "none" }}
				/>
				<Bar dataKey="value" name="Tasks" fill="#556272" radius={[10, 10, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default function TaskCharts() {
	const { status } = useSession()
	const { tasks, activeTasks, completedTasks, deleteTask, priority } = useTasks()

	if (status !== "authenticated") {
		return null
	}

	const priorities = ["Low", "Normal", "High"]

	const filteredTasks = priority === "all" ? tasks : tasks.filter((task) => task.priority === priority)

	const completionPercentage = tasks.length > 0 ? ((completedTasks.length / tasks.length) * 100).toFixed(0) : "0"

	const tasksDueSoon = tasks.filter((task) => {
		if (task.dueDate) {
			const currentTime = new Date()
			const dueTime = new Date(task.dueDate)
			const timeDiff = dueTime.getTime() - currentTime.getTime()
			const hoursUntilDue = timeDiff / (1000 * 3600)
			return hoursUntilDue <= 24 && hoursUntilDue >= 0
		}
		return false
	}).length

	const handleDeleteTasks = () => {
		if (window.confirm("Are you sure you want to delete all tasks? This action cannot be undone.")) {
			deleteTask()
		}
	}

	const priorityCounts = priorities.reduce((acc, priorityLevel) => {
		acc[priorityLevel] = filteredTasks.filter((task) => task.priority === priorityLevel.toLowerCase()).length
		return acc
	}, {})

	return (
		<div className="card flex w-full flex-col items-center">
			<h2 className="text-center">Tasks Overview</h2>

			<div className="flex w-full flex-col items-center gap-2">
				<h4>Task Completion</h4>
				<TaskCompletionChart
					completionPercentage={parseInt(completionPercentage, 10)}
					completedTasks={completedTasks.length}
					activeTasks={activeTasks.length}
				/>
			</div>

			<div className="flex w-full flex-col items-center gap-2">
				<h4>Tasks By Priority</h4>
				<TaskPriorityChart priorityCounts={priorityCounts} />
			</div>

			<p className="mt-2 flex items-center text-sm font-medium">
				<span className="font-bold text-danger">{tasksDueSoon}</span>
				<span className="ml-1">task{tasksDueSoon !== 1 ? "s" : ""} due within 24 hours.</span>
			</p>

			<button className="btn mt-4 bg-danger" onClick={handleDeleteTasks}>
				Delete All Tasks
			</button>
		</div>
	)
}
