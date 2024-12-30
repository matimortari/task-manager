import { useTasks } from "@/src/components/context/TaskContext"

export function useTaskActions() {
	const { tasks, toggleEditTaskModal, deleteTask } = useTasks()

	// Handle opening the modal for editing a task
	const handleEditTask = (task) => {
		toggleEditTaskModal(task) // Set modalMode to "edit" and pass the task to edit
	}

	// Handle deleting a task
	const handleDeleteTask = (taskId: string) => {
		deleteTask(taskId)
	}

	const filterTasks = (status: "active" | "completed" | "overdue") => {
		const currentDate = new Date()

		switch (status) {
			case "active":
				return tasks.filter((task: Task) => !task.completed && new Date(task.dueDate) >= currentDate)
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
		filterTasks,
		handleEditTask,
		handleDeleteTask
	}
}
