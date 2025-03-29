import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session?.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}

export function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	})
}

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

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
