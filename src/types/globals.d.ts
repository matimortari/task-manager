interface TaskContextType {
	tasks: Task[]
	filteredTasks: Task[]
	task: Task
	createTask: (task: Task) => void
	updateTask: (task: Task) => void
	deleteTask: (taskId?: string) => void
	toggleTaskStatus: (taskId: string, isCompleted: boolean) => void
	priority: string
	setPriority: (priority: string) => void
	handleInput: (name: string) => (e: any) => void
	isEditing: boolean
	setIsEditing: (isEditing: boolean) => void
	activeTasks: Task[]
	completedTasks: Task[]
	overdueTasks: Task[]
}

interface Task {
	id?: string
	title: string
	content: string
	status: string
	completed?: boolean
	dueDate: string
	priority: string
	createdAt?: string
	updatedAt?: string
}
