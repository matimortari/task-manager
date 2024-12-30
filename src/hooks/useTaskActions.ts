import { useTasks } from "@/src/components/context/TaskContext"
import { createTask, updateTask } from "@/src/lib/actions"
import { useState } from "react"

export function useTaskActions() {
	const { tasks, toggleAddTaskModal, toggleEditTaskModal, deleteTask, task, modalMode, closeModal, activeTask } =
		useTasks()
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Handle opening the modal for adding a task
	const handleAddTask = () => {
		toggleAddTaskModal()
		setIsModalOpen(true)
	}

	// Handle opening the modal for editing a task
	const handleEditTask = (task) => {
		toggleEditTaskModal(task)
		setIsModalOpen(true)
	}

	// Handle closing the modal
	const handleCloseModal = () => {
		setIsModalOpen(false)
		closeModal()
	}

	// Handle form submission for adding or updating a task
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (modalMode === "add") {
			createTask({
				title: task.title,
				content: task.description,
				priority: task.priority,
				dueDate: task.dueDate,
				completed: task.completed,
				id: "",
				userId: "",
				status: "",
				createdAt: new Date(),
				updatedAt: new Date()
			})
		} else if (modalMode === "edit") {
			updateTask({
				...task,
				id: activeTask.id
			})
		}

		handleCloseModal() // Close the modal after submission
	}

	// Handle deleting a task
	const handleDeleteTask = (taskId: string) => {
		deleteTask(taskId)
	}

	// Handle filtering tasks based on their status
	const filterTasks = (status: "active" | "completed" | "overdue") => {
		const currentDate = new Date()

		switch (status) {
			case "active":
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
		handleAddTask,
		handleEditTask,
		handleSubmit,
		handleDeleteTask,
		handleCloseModal,
		filterTasks,
		isModalOpen
	}
}
