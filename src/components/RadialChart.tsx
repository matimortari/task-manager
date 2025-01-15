"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { useSession } from "next-auth/react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { useTasks } from "./context/TaskContext"

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
	const { status } = useSession()
	const { tasks, activeTasks, completedTasks } = useTasks()

	if (status !== "authenticated") {
		return null
	}

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
				<ChartContainer config={chartConfig} className="mx-auto aspect-square w-full">
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
							fill="#556272"
							stackId="a"
							cornerRadius={5}
							className="stroke-transparent stroke-2"
						/>
						<RadialBar
							dataKey="active"
							fill="#8Bce89"
							stackId="a"
							cornerRadius={5}
							className="stroke-transparent stroke-2"
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>

			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					{tasksTotal > 0 ? (
						<>{((completedTasks.length / tasksTotal) * 100).toFixed(0)}% of tasks completed</>
					) : (
						"No tasks available"
					)}
					<TrendingUp className="size-4" />
				</div>
			</CardFooter>
		</Card>
	)
}
