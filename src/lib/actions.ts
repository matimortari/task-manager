import { Task } from "@prisma/client"

// Get user tasks
export const getTasks = async () => {
	const res = await fetch("/api/tasks", { method: "GET" })
	return res.json()
}

// Create a new task
export const createTask = async (task: Task) => {
	const res = await fetch("/api/tasks", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task)
	})
	return res.json()
}

// Update an existing task
export const updateTask = async (task: Task) => {
	const res = await fetch(`/api/tasks/${task.id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task)
	})
	return res.json()
}

// Delete an existing task
export const deleteTask = async (id: number) => {
	const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" })
	return res.json()
}
