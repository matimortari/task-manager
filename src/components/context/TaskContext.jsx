"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
	const { data: session } = useSession()
	const userId = session?.user?.id
	const [tasks, setTasks] = useState([])
	const [loading, setLoading] = useState(false)
	const [task, setTask] = useState({})
	const [isEditing, setIsEditing] = useState(false)
	const [priority, setPriority] = useState("all")
	const [activeTask, setActiveTask] = useState(null)
	const [modalMode, setModalMode] = useState("")
	const [profileModal, setProfileModal] = useState(false)

	const toggleAddTaskModal = () => {
		setModalMode("add")
		setIsEditing(true)
		setTask({})
	}

	const toggleEditTaskModal = (task) => {
		setModalMode("edit")
		setIsEditing(true)
		setActiveTask(task)
	}

	const toggleProfileModal = () => {
		setProfileModal(true)
	}

	const closeModal = () => {
		setIsEditing(false)
		setProfileModal(false)
		setModalMode("")
		setActiveTask(null)
		setTask({})
	}

	// Get all tasks
	const getTasks = async () => {
		if (!userId) return // Prevent API call if userId is not available
		setLoading(true)
		try {
			const response = await fetch("/api/tasks")
			const data = await response.json()
			setTasks(data)
		} catch (error) {
			console.log("Error getting tasks", error)
		}
		setLoading(false)
	}

	// Create a new task
	const createTask = async (task) => {
		if (!userId) return
		setLoading(true)
		try {
			const res = await fetch("/api/tasks", {
				method: "POST",
				body: JSON.stringify({
					...task
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})

			const data = await res.json()

			if (res.ok) {
				setTasks([...tasks, data])
				toast.success("Task created successfully")
			} else {
				toast.error("Error creating task: " + data.error)
			}
		} catch (error) {
			console.log("Error creating task", error)
			toast.error("An unexpected error occurred")
		}
		setLoading(false)
	}

	// Update a task by ID
	const updateTask = async (task) => {
		try {
			const res = await fetch(`/api/tasks/${task.id}`, {
				method: "PUT",
				body: JSON.stringify(task),
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!res.ok) {
				throw new Error(`Failed to update task: ${res.status}`)
			}

			const updatedTask = await res.json()
			setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
			toast.success("Task updated successfully")
		} catch (error) {
			console.error("Error updating task:", error)
			toast.error("Error updating task")
		}
	}

	// Handle task completion toggle
	const toggleTaskStatus = async (taskId, isCompleted) => {
		setLoading(true)
		try {
			const res = await fetch(`/api/tasks/${taskId}`, {
				method: "PUT",
				body: JSON.stringify({
					completed: isCompleted
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (!res.ok) {
				throw new Error("Failed to update task status")
			}

			const updatedTask = await res.json()

			setTasks((prevTasks) =>
				prevTasks.map((task) => (task.id === updatedTask.id ? { ...task, completed: updatedTask.completed } : task))
			)

			toast.success("Task status updated successfully")
		} catch (error) {
			console.error("Error updating task status:", error)
			toast.error("Error updating task status")
		}
		setLoading(false)
	}

	// Delete a task by ID
	const deleteTask = async (taskId) => {
		setLoading(true)
		try {
			await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" })

			const newTasks = tasks.filter((tsk) => tsk.id !== taskId)
			setTasks(newTasks)
		} catch (error) {
			console.log("Error deleting task", error)
		}
		setLoading(false)
	}

	const handleInput = (name) => (e) => {
		if (name === "setTask") {
			setTask(e)
		} else {
			const value = name === "completed" ? e.target.value === "true" : e.target.value
			setTask({ ...task, [name]: value })
		}
	}

	const completedTasks = tasks.filter((task) => task.completed)
	const activeTasks = tasks.filter((task) => !task.completed)
	const overdueTasks = tasks.filter((task) => !task.completed && new Date(task.dueDate) < new Date())

	useEffect(() => {
		if (userId) {
			getTasks()
		}
	}, [userId])

	return (
		<TasksContext.Provider
			value={{
				tasks,
				loading,
				task,
				createTask,
				updateTask,
				deleteTask,
				toggleTaskStatus,
				priority,
				setPriority,
				handleInput,
				isEditing,
				setIsEditing,
				toggleAddTaskModal,
				toggleEditTaskModal,
				activeTask,
				closeModal,
				modalMode,
				toggleProfileModal,
				activeTasks,
				completedTasks,
				overdueTasks,
				profileModal
			}}
		>
			{children}
		</TasksContext.Provider>
	)
}

export const useTasks = () => {
	return useContext(TasksContext)
}
