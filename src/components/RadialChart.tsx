"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { useSession } from "next-auth/react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

export const description = "A radial chart with stacked sections"

const chartConfig = {
	desktop: {
		label: "Completed",
		color: "#8BCE89"
	},
	mobile: {
		label: "Active",
		color: "#EB4E31"
	}
} satisfies ChartConfig

export default function RadialChart() {
	const { data: session, status } = useSession()

	// Render nothing if the user is not authenticated
	if (status !== "authenticated") {
		return null
	}

	const tasks = [
		{ id: 1, title: "Task 1", completed: true },
		{ id: 2, title: "Task 2", completed: false },
		{ id: 3, title: "Task 3", completed: true },
		{ id: 4, title: "Task 4", completed: false },
		{ id: 5, title: "Task 5", completed: true }
	]

	const activeTasks = tasks.filter((task) => !task.completed)
	const completedTasks = tasks.filter((task) => task.completed)
	const tasksTotal = tasks.length

	const chartData = [
		{
			active: activeTasks.length,
			completed: completedTasks.length
		}
	]

	return (
		<Card className="card flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Tasks Overview</CardTitle>
			</CardHeader>

			<CardContent className="flex flex-1 items-center pb-0">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[200px]">
					<RadialBarChart data={chartData} endAngle={180} innerRadius={60} outerRadius={100}>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) - 16} className="fill-foreground text-xl font-bold">
													{tasksTotal}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">
													Tasks
												</tspan>
											</text>
										)
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey="completed"
							fill="#8BCE89"
							stackId="a"
							cornerRadius={5}
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="active"
							fill="#EB4E31"
							stackId="a"
							cornerRadius={5}
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Task completion improved by 12% this month <TrendingUp className="size-4" />
				</div>
				<div className="leading-none text-muted-foreground">Analysis based on tasks completed in the last 30 days.</div>
			</CardFooter>
		</Card>
	)
}
