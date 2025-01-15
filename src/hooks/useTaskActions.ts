import { useTasks } from "@/src/components/context/TaskContext"

export function useTaskActions() {
	const { tasks } = useTasks()

	// Handle filtering tasks based on their status
	const filterTasks = (status: "active" | "completed" | "overdue") => {
		const currentDate = new Date()

		switch (status) {
			case "active":
				return tasks.filter((task: Task) => !task.completed)
			case "completed":
				return tasks.filter((task: Task) => task.completed)
			case "overdue":
				return tasks.filter((task: Task) => !task.completed && new Date(task.dueDate) < currentDate)
			default:
				return tasks
		}
	}

	return {
		tasks,
		filterTasks
	}
}
