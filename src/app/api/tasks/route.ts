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

	if (!title || !content) {
		return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
	}

	const task = await db.task.create({
		data: {
			title,
			content,
			dueDate,
			priority,
			status,
			completed: false,
			user: { connect: { id: session.user.id } }
		}
	})

	return NextResponse.json(task, { status: 201 })
}

// PUT method for updating a user task
export async function PUT(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const taskId = req.nextUrl.searchParams.get("id")
	if (!taskId) {
		return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
	}

	const { title, content, dueDate, priority, status, completed } = await req.json()

	const existingTask = await db.task.findFirst({ where: { id: taskId } })
	if (!existingTask || existingTask.userId !== session.user.id) {
		return NextResponse.json({ error: "Task not found or not authorized" }, { status: 404 })
	}

	const updatedTask = await db.task.update({
		where: { id: taskId },
		data: {
			title,
			content,
			dueDate,
			priority,
			status,
			completed
		}
	})

	return NextResponse.json(updatedTask, { status: 200 })
}

// DELETE method for deleting a user task or all tasks
export async function DELETE(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const taskId = req.nextUrl.searchParams.get("id")

	// Delete a specific task if taskId is provided. Otherwise, delete all tasks
	if (taskId) {
		const existingTask = await db.task.findFirst({ where: { id: taskId } })
		if (!existingTask || existingTask.userId !== session.user.id) {
			return NextResponse.json({ error: "Task not found or not authorized" }, { status: 404 })
		}

		await db.task.delete({ where: { id: taskId } })
		return NextResponse.json({ id: taskId }, { status: 200 })
	} else {
		await db.task.deleteMany({ where: { userId: session.user.id } })
		return NextResponse.json({ message: "All tasks deleted" }, { status: 200 })
	}
}
