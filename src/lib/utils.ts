import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { twMerge } from "tailwind-merge"
import { authOptions } from "./auth"

// Use a helper to make it easier to conditionally add Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// Helper function to get the session or return an unauthorized JSON response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
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
