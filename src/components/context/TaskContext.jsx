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

	// Get a single task
	const getTask = async (taskId) => {
		setLoading(true)
		try {
			const response = await fetch(`/api/tasks/${taskId}`)
			setTask(await response.json())
		} catch (error) {
			console.log("Error getting task", error)
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
		setLoading(true)
		try {
			const res = await fetch("/api/tasks", {
				method: "PUT",
				body: JSON.stringify(task),
				headers: {
					"Content-Type": "application/json"
				}
			})

			const data = await res.json()
			const newTasks = tasks.map((tsk) => (tsk.id === data.id ? data : tsk))

			toast.success("Task updated successfully")
			setTasks(newTasks)
		} catch (error) {
			console.log("Error updating task", error)
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
			setTask({ ...task, [name]: e.target.value })
		}
	}

	const completedTasks = tasks.filter((task) => task.completed)
	const activeTasks = tasks.filter((task) => !task.completed)

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
				getTask,
				createTask,
				updateTask,
				deleteTask,
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
