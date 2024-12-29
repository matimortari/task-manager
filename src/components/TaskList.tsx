import { useTasks } from "@/src/components/context/TaskContext"
import TaskItem from "@/src/components/TaskItem"

interface TaskListProps {
	title: string
	filterFn: (task: any) => boolean
}

export default function TaskList({ title, filterFn }: TaskListProps) {
	const { tasks, toggleEditTaskModal, deleteTask } = useTasks()

	// Filter tasks based on the filter function passed as a prop
	const filteredTasks = tasks.filter(filterFn)

	// Handle opening the modal for editing a task
	const handleEditTask = (task) => {
		toggleEditTaskModal(task) // Set modalMode to "edit" and pass the task to edit
	}

	// Handle deleting a task
	const handleDeleteTask = (taskId: string) => {
		deleteTask(taskId)
	}

	return (
		<div className="card flex h-screen flex-col items-center overflow-auto">
			<h2 className="mb-4 text-2xl font-bold">{title}</h2>
			<div className="my-4 grid grid-cols-3 gap-4">
				{filteredTasks.length === 0 ? (
					<p>No tasks found</p>
				) : (
					filteredTasks.map((task) => (
						<TaskItem key={task.id} task={task} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
					))
				)}
			</div>
		</div>
	)
}
