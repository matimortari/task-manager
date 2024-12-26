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

// // PUT method for updating a user task
// export async function PUT(req: NextRequest) {
// 	const { error, session, response } = await getSessionOrUnauthorized()
// 	if (error) return response
// }

// // DELETE method for deleting a user task
// export async function DELETE(req: NextRequest) {
// 	const { error, session, response } = await getSessionOrUnauthorized()
// 	if (error) return response
// }
