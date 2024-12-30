"use client"

import Filters from "@/src/components/Filters"
import Modal from "@/src/components/Modal"
import TaskItem from "@/src/components/TaskItem"
import { useTaskActions } from "@/src/hooks/useTaskActions"

export default function Home() {
	const { tasks, handleAddTask, handleEditTask, handleSubmit, handleDeleteTask, handleCloseModal, isModalOpen } =
		useTaskActions()

	return (
		<div className="card min-h-screen">
			<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
				<h2 className="title">Add or Edit Task</h2>
				<form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}></form>
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
