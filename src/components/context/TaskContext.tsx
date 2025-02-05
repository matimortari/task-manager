"use client"

import { useSession } from "next-auth/react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

const TasksContext = createContext<TaskContextType | undefined>(undefined)

export const TasksProvider = ({ children }) => {
	const { data: session } = useSession()
	const [tasks, setTasks] = useState<Task[]>([])
	const [task, setTask] = useState<Task>({
		id: "",
		title: "",
		content: "",
		status: "",
		completed: false,
		dueDate: "",
		priority: "low",
		createdAt: "",
		updatedAt: ""
	})
	const [isEditing, setIsEditing] = useState(false)
	const [priority, setPriority] = useState("all")

	// Get all tasks from the server
	const getTasks = async () => {
		try {
			const response = await fetch("/api/tasks", { method: "GET" })
			const data = await response.json()
			setTasks(data)
		} catch (error) {
			console.log("Error getting tasks", error)
		}
	}

	// Create a new task
	const createTask = async (task) => {
		try {
			const res = await fetch("/api/tasks", {
				method: "POST",
				body: JSON.stringify(task),
				headers: { "Content-Type": "application/json" }
			})
			const data = await res.json()
			if (!res.ok) return toast.error("Error creating task: " + data.error)

			setTasks([...tasks, data])
			toast.success("Task created successfully")
		} catch {
			toast.error("An unexpected error occurred")
		}
	}

	// Update a task
	const updateTask = async (task) => {
		try {
			const res = await fetch(`/api/tasks?id=${task.id}`, {
				method: "PUT",
				body: JSON.stringify({
					title: task.title,
					content: task.content,
					priority: task.priority,
					completed: task.completed
				}),
				headers: { "Content-Type": "application/json" }
			})
			if (!res.ok) return toast.error(`Failed to update task: ${res.status}`)

			const updatedTask = await res.json()
			setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
			toast.success("Task updated successfully")
		} catch {
			toast.error("Error updating task")
		}
	}

	// Toggle task status
	const toggleTaskStatus = async (taskId: string, isCompleted: boolean) => {
		try {
			const res = await fetch(`/api/tasks?id=${taskId}`, {
				method: "PUT",
				body: JSON.stringify({ completed: isCompleted }),
				headers: { "Content-Type": "application/json" }
			})

			if (!res.ok) {
				return toast.error(`Failed to update task status: ${res.status}`)
			}

			const updatedTask = await res.json()

			setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
			toast.success("Task status updated successfully")
		} catch {
			toast.error("Error updating task status")
		}
	}

	// Delete a specific task or all tasks
	const deleteTask = async (taskId: string | undefined = undefined) => {
		try {
			const url = taskId ? `/api/tasks?id=${taskId}` : "/api/tasks"
			const res = await fetch(url, { method: "DELETE" })
			if (!res.ok) {
				return toast.error("Error deleting task(s)")
			}

			if (taskId) {
				setTasks((prev) => prev.filter((task) => task.id !== taskId))
				toast.success("Task deleted successfully")
			} else {
				setTasks([])
				toast.success("All tasks deleted successfully")
			}
		} catch {
			toast.error("Error deleting task(s)")
		}
	}

	// Handle input change for form fields
	const handleInput = (name: string) => (e: any) => {
		if (name === "setTask") {
			setTask(e)
		} else {
			const value = name === "completed" ? e.target.value === "true" : e.target.value
			setTask({ ...task, [name]: value })
		}
	}

	// Filter tasks based on priority
	const filteredTasks = tasks.filter((task) => {
		if (priority === "all") return true
		return task.priority === priority
	})

	const completedTasks = tasks.filter((task) => task.completed)
	const activeTasks = tasks.filter((task) => !task.completed)
	const overdueTasks = tasks.filter((task) => !task.completed && new Date(task.dueDate) < new Date())

	useEffect(() => {
		if (session?.user?.id) {
			getTasks()
		}
	}, [session?.user?.id])

	// Use useMemo to memoize the context value
	const contextValue = useMemo(
		() => ({
			tasks,
			filteredTasks,
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
			activeTasks,
			completedTasks,
			overdueTasks
		}),
		[tasks, filteredTasks, task, priority, isEditing, activeTasks, completedTasks, overdueTasks]
	)

	return <TasksContext.Provider value={contextValue}>{children}</TasksContext.Provider>
}

export const useTasks = (): TaskContextType => {
	const context = useContext(TasksContext)
	if (!context) {
		throw new Error("useTasks must be used within a TasksProvider")
	}
	return context
}
