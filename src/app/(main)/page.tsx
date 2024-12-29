"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import Filters from "@/src/components/Filters"
import Modal from "@/src/components/Modal"
import TaskItem from "@/src/components/TaskItem"
import { useState } from "react"

export default function Home() {
	const {
		tasks,
		toggleAddTaskModal,
		task,
		handleInput,
		createTask,
		modalMode,
		closeModal,
		toggleEditTaskModal,
		deleteTask
	} = useTasks()
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Handle opening the modal for adding a task
	const handleAddTask = () => {
		toggleAddTaskModal() // Set modalMode to "add"
		setIsModalOpen(true)
	}

	// Handle opening the modal for editing a task
	const handleEditTask = (task) => {
		toggleEditTaskModal(task) // Set modalMode to "edit" and pass the task to edit
		setIsModalOpen(true)
	}

	// Handle deleting a task
	const handleDeleteTask = (taskId: string) => {
		deleteTask(taskId)
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
		}

		closeModal() // Close the modal after submission
		setIsModalOpen(false) // Hide the modal
	}

	return (
		<div className="card min-h-screen">
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
							value={task.completed ? "true" : "false"}
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

			<Filters />

			<div className="my-4 grid grid-cols-3 gap-4">
				{tasks.map((task) => (
					<TaskItem key={task.id} task={task} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
				))}

				<button
					className="h-64 w-full rounded-2xl border-2 border-dashed py-2 text-lg font-medium text-muted-foreground	
          transition duration-200 ease-in-out hover:bg-secondary"
					onClick={handleAddTask}
				>
					Add New Task
				</button>
			</div>
		</div>
	)
}
