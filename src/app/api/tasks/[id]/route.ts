import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for retrieving a specific task by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = params.id // Retrieve the task ID from the route params

	// Retrieve the task from the database
	const task = await db.task.findFirst({
		where: { id, userId: session.user.id } // Ensure task belongs to the logged-in user
	})

	if (!task) {
		return NextResponse.json({ error: "Task not found" }, { status: 404 })
	}

	return NextResponse.json(task, { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = params.id // Retrieve the ID from the route params
	const body = await req.json()
	const { title, content, dueDate, priority, status, completed } = body

	// Check if task exists
	const existingTask = await db.task.findFirst({ where: { id, userId: session.user.id } })
	if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 })

	// Prepare update data
	const updateData: any = {}
	if (title) updateData.title = title
	if (content) updateData.content = content
	if (dueDate) updateData.dueDate = dueDate
	if (priority) updateData.priority = priority
	if (status) updateData.status = status
	if (completed !== undefined) updateData.completed = completed

	// Update the task
	const updatedTask = await db.task.update({ where: { id }, data: updateData })

	return NextResponse.json(updatedTask, { status: 200 })
}
