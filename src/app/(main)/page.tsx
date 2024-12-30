"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import Filters from "@/src/components/Filters"
import Modal from "@/src/components/Modal"
import TaskItem from "@/src/components/TaskItem"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Home() {
	const { tasks, handleAddTask, handleEditTask, handleDeleteTask, handleCloseModal, isModalOpen, handleSubmit } =
		useTaskActions()
	const { task, handleInput, modalMode } = useTasks()

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

			<Filters />

			<div className="my-4 grid grid-cols-3 gap-4">
				{tasks.map((task: Task) => (
					<TaskItem key={task.id} task={task} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
				))}

				<button
					className="size-64 w-full rounded-2xl border-2 border-dashed py-2 text-lg font-medium text-muted-foreground	
          transition duration-200 ease-in-out hover:bg-secondary"
					onClick={handleAddTask}
				>
					Add New Task
				</button>
			</div>
		</div>
	)
}
