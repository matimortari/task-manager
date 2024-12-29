import { useTasks } from "@/src/components/context/TaskContext"

export function useTaskActions() {
	const { tasks, toggleEditTaskModal, deleteTask } = useTasks()

	// Handle opening the modal for editing a task
	const handleEditTask = (task) => {
		toggleEditTaskModal(task) // Set modalMode to "edit" and pass the task to edit
	}

	// Handle deleting a task
	const handleDeleteTask = (taskId: string) => {
		deleteTask(taskId) // Call the delete function from the context
	}

	// Filter tasks by status: pending, completed, or overdue
	const filterTasks = (status: "pending" | "completed" | "overdue") => {
		const currentDate = new Date()

		switch (status) {
			case "pending":
				return tasks.filter((task) => !task.completed && new Date(task.dueDate) >= currentDate)
			case "completed":
				return tasks.filter((task) => task.completed)
			case "overdue":
				return tasks.filter((task) => !task.completed && new Date(task.dueDate) < currentDate)
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
