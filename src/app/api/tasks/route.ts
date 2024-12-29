import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting user tasks
export async function GET() {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const tasks = await db.task.findMany({ where: { userId: session.user.id } })
	if (!tasks) return NextResponse.json({ error: "No tasks found" }, { status: 404 })

	return NextResponse.json(tasks, { status: 200 })
}

// POST method for creating a new user task
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { title, content, dueDate, priority, status } = await req.json()

	const task = await db.task.create({
		data: {
			title,
			content,
			dueDate,
			priority,
			status,
			user: { connect: { id: session.user.id } }
		}
	})
	if (!task) return NextResponse.json({ error: "Task not created" }, { status: 500 })

	return NextResponse.json(task, { status: 201 })
}

// PUT method for updating a user task
export async function PUT(req: NextRequest) {
	const { error, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { id, title, content, dueDate, priority, status, completed } = await req.json()

	// Find the task to be updated
	const existingTask = await db.task.findFirst({ where: { id } })
	if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 })

	// Prepare the data to be updated, considering that some fields may not be provided
	const updateData: any = {}
	if (title) updateData.title = title
	if (content) updateData.content = content
	if (dueDate) updateData.dueDate = dueDate
	if (priority) updateData.priority = priority
	if (status) updateData.status = status
	if (completed !== undefined) updateData.completed = completed // Update completed status if provided

	const updatedTask = await db.task.update({ where: { id }, data: updateData })

	return NextResponse.json(updatedTask, { status: 200 })
}

// DELETE method for deleting a user task
export async function DELETE(req: NextRequest) {
	const { error, response } = await getSessionOrUnauthorized()
	if (error) return response

	const id = req.nextUrl.searchParams.get("id")
	if (!id) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const existingTask = await db.task.findFirst({ where: { id } })
	if (!existingTask) return NextResponse.json({ error: "Task not found" }, { status: 404 })

	await db.task.delete({ where: { id } })

	return NextResponse.json({ id })
}
