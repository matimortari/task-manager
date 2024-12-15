import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"

// Helper function to get the session or return an unauthorized JSON response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}
