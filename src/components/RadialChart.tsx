"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart"
import { getColorforPriority } from "@/src/lib/utils"
import { TrendingUp } from "lucide-react"
import { useSession } from "next-auth/react"
import {
	Cell,
	Label,
	Pie,
	PieChart,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
	ResponsiveContainer,
	Tooltip
} from "recharts"

export const description = "A radial chart with stacked sections"

const chartConfig = {
	completed: {
		label: "Completed",
		color: "#34D399"
	},
	active: {
		label: "Active",
		color: "#F87171"
	}
} satisfies ChartConfig

export default function RadialChart() {
	const { status } = useSession()
	const { tasks, activeTasks, completedTasks, deleteTask, priority } = useTasks()

	if (status !== "authenticated") {
		return null
	}

	const priorities = ["All", "Low", "Normal", "High"]

	const filteredTasks = priority === "all" ? tasks : tasks.filter((task) => task.priority === priority)

	const chartData = [
		{
			active: activeTasks.length,
			completed: completedTasks.length
		}
	]

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

	const completionPercentage = tasks.length > 0 ? ((completedTasks.length / tasks.length) * 100).toFixed(0) : 0

	// Calculate the number of tasks for each priority
	const priorityCounts = priorities.reduce((acc, priorityLevel) => {
		acc[priorityLevel] = filteredTasks.filter((task) => task.priority === priorityLevel.toLowerCase()).length
		return acc
	}, {})

	return (
		<Card className="card">
			<CardHeader>
				<CardTitle className="text-center">Tasks Overview</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-col">
				<div className="flex flex-col items-center">
					<h3 className="mb-4 text-sm font-medium">Task Completion</h3>
					<ChartContainer config={chartConfig} className="size-32">
						<RadialBarChart data={chartData} startAngle={180} endAngle={0} innerRadius={60} outerRadius={80}>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
								<Label
									content={({ viewBox }) => {
										if (viewBox && "cx" in viewBox && "cy" in viewBox) {
											return (
												<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
													<tspan
														x={viewBox.cx}
														y={(viewBox.cy || 0) - 10}
														className="fill-foreground text-xl font-bold"
													>
														{tasks.length}
													</tspan>
													<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 10} className="fill-muted-foreground text-xs">
														Tasks
													</tspan>
												</text>
											)
										}
									}}
								/>
							</PolarRadiusAxis>
							<RadialBar dataKey="completed" fill="var(--color-completed)" cornerRadius={5} />
							<RadialBar dataKey="active" fill="var(--color-active)" cornerRadius={5} />
						</RadialBarChart>
					</ChartContainer>
				</div>

				<div className="flex flex-col items-center">
					<h3 className="mb-4 text-sm font-medium">Task Priorities</h3>
					<ResponsiveContainer width="100%" height={200}>
						<PieChart>
							<Pie
								data={priorities.map((priorityLevel) => ({
									name: priorityLevel,
									value: priorityCounts[priorityLevel] || 0
								}))}
								dataKey="value"
								nameKey="name"
								cx="50%"
								cy="50%"
								outerRadius={80}
								label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
								labelLine={false}
							>
								{priorities.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={getColorforPriority(entry)} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</CardContent>

			<CardFooter className="flex flex-col items-center gap-2 text-center">
				<div className="flex items-center gap-2 text-sm font-medium">
					<TrendingUp className="size-4" />
					<p>{completionPercentage}% of tasks completed</p>
				</div>

				<div className="flex items-center gap-2 text-sm font-medium">
					<p>
						<span className="font-bold text-danger">{tasksDueSoon}</span> task{tasksDueSoon !== 1 ? "s" : ""} due within
						24 hours.
					</p>
				</div>

				<button className="btn bg-danger" onClick={handleDeleteTasks}>
					Delete All Tasks
				</button>
			</CardFooter>
		</Card>
	)
}
