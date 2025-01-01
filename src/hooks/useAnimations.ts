import { useEffect, useState } from "react"

export function useAnimations(duration: number = 1000) {
	const [isFlashing, setIsFlashing] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsFlashing(false)
		}, duration)

		return () => clearTimeout(timer)
	}, [duration])

	return isFlashing
}
