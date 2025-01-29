import { useEffect, useRef, useState } from "react"

export default function useDialog(onClose: () => void, isOpen: boolean) {
	const dialogRef = useRef<HTMLDivElement>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}

		const handleClickOutside = (e: MouseEvent) => {
			if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
				onClose()
			}
		}

		// Prevent scrolling when dialog is open
		if (isOpen) {
			document.documentElement.style.overflow = "hidden"
			window.addEventListener("keydown", handleKeyDown)
			document.addEventListener("mousedown", handleClickOutside)
		} else {
			document.documentElement.style.overflow = ""
		}

		return () => {
			document.documentElement.style.overflow = ""
			window.removeEventListener("keydown", handleKeyDown)
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [onClose])

	return { dialogRef, error, setError }
}
