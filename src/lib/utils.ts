import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"

// Get the session or return an unauthorized JSON response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}

// Helper function to format a date string
export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	})
}

// Helper function to capitalize the first letter of a string
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

// Get the color to represent a task priority
export const getColorforPriority = (priority: string) => {
	switch (priority) {
		case "Low":
			return "#548354"
		case "Normal":
			return "#d1c629"
		case "High":
			return "#a04646"
		default:
			return "#cccccc"
	}
}

// Get the color for task completion status
export const getColorForCompletion = (status: string) => {
	switch (status) {
		case "Active":
			return "#417475"
		case "Completed":
			return "#555483"
		default:
			return "#cccccc"
	}
}
