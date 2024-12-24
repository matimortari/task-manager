export const getTasks = async () => {
	const res = await fetch("/api/tasks", { method: "GET" })
	return res.json()
}
