"use client"

import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { updateTask } from "../lib/actions"
import { useTasks } from "./context/TaskContext"
import Modal from "./Modal"
import ThemeSwitch from "./ThemeSwitch"

export default function Header() {
	const { toggleAddTaskModal, task, tasks, activeTask, handleInput, createTask, modalMode, closeModal } = useTasks()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { data: session } = useSession()
	const userName = session?.user?.name
	const isLoggedIn = !!session

	// Handle opening the modal for adding a task
	const handleAddTask = () => {
		toggleAddTaskModal() // Set modalMode to "add"
		setIsModalOpen(true)
	}

	// Handle closing the modal
	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	// Handle form submission for adding a task
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (modalMode === "add") {
			createTask({
				title: task.title,
				content: task.description,
				priority: task.priority,
				dueDate: task.dueDate,
				completed: task.completed
			})
		} else if (modalMode === "edit") {
			updateTask({
				...task,
				id: activeTask.id // Ensure the task ID is passed for updates
			})
		}

		closeModal() // Close the modal after submission
		setIsModalOpen(false) // Hide the modal
	}

	return (
		<div className="flex w-full items-center justify-between px-4 py-2">
			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				<h2 className="title">{modalMode === "add" ? "Add a New Task" : "Edit Task"}</h2>
				<form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-1">
						<label htmlFor="title">Task Title</label>
						<input
							type="text"
							id="title"
							placeholder="Enter task title"
							value={task.title}
							onChange={(e) => handleInput("title")(e)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="content">Description</label>
						<textarea
							id="content"
							placeholder="Enter task description"
							rows={4}
							value={task.description}
							onChange={(e) => handleInput("description")(e)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="priority">Priority</label>
						<select id="priority" value={task.priority} onChange={(e) => handleInput("priority")(e)}>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="dueDate">Due Date</label>
						<input type="date" id="dueDate" value={task.dueDate} onChange={(e) => handleInput("dueDate")(e)} />
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="completed">Completed</label>
						<select
							id="completed"
							value={task.completed ? "true" : "false"} // Set string representation
							onChange={(e) => handleInput("completed")(e)}
						>
							<option value="false">No</option>
							<option value="true">Yes</option>
						</select>
					</div>

					<button type="submit" className={`btn bg-primary`}>
						{modalMode === "add" ? "Create Task" : "Update Task"}
					</button>
				</form>
			</Modal>

			<div className="flex h-12 items-center justify-center gap-8">
				<Image src="/logo.png" alt="Logo" width={25} height={25} />

				<div className="ml-16">
					<h1 className="text-base font-semibold">👋 Hello, {isLoggedIn ? userName : "Guest"}</h1>
					<span className="text-sm">
						{isLoggedIn ? (
							<h2 className="text-sm">
								You have <span className="font-bold text-accent">{tasks.length}</span> active tasks.
							</h2>
						) : (
							"Please sign in to see your tasks."
						)}
					</span>
				</div>
			</div>

			<div className="flex items-center">
				<button onClick={handleAddTask} className="btn bg-primary text-sm">
					Add New Task
				</button>
			</div>

			<div className="flex items-center gap-2">
				<ThemeSwitch />
				{isLoggedIn ? (
					<button
						onClick={() => signOut()}
						className="flex size-10 items-center justify-center rounded-full border hover:border-muted"
					>
						<Icon icon="mdi:logout" className="size-5" />
					</button>
				) : (
					<Link
						href="/login"
						className="flex size-10 items-center justify-center rounded-full border hover:border-muted"
					>
						<Icon icon="mdi:login" className="size-5" />
					</Link>
				)}
			</div>
		</div>
	)
}
