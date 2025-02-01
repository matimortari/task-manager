"use client"

import "@/src/styles/inputs.css"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export default function ThemeSwitch() {
	const [isDarkMode, setIsDarkMode] = useState(false)

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme")
		if (savedTheme === "dark") {
			setIsDarkMode(true)
			document.documentElement.classList.add("dark")
		} else {
			setIsDarkMode(false)
			document.documentElement.classList.remove("dark")
		}
	}, [])

	const toggleTheme = () => {
		setIsDarkMode((prev) => {
			const newTheme = !prev
			if (newTheme) {
				document.documentElement.classList.add("dark")
				localStorage.setItem("theme", "dark")
			} else {
				document.documentElement.classList.remove("dark")
				localStorage.setItem("theme", "light")
			}
			return newTheme
		})
	}

	return (
		<div className="flex items-center justify-start gap-2">
			<span className="text-xs font-semibold">Theme: {isDarkMode ? "Dark" : "Light"}</span>
			<label htmlFor="theme-switch" className="relative inline-block h-4 w-8">
				<span className="sr-only">Toggle Theme</span>
				<input
					id="theme-switch"
					type="checkbox"
					className="size-0 opacity-0"
					checked={isDarkMode}
					onChange={toggleTheme}
				/>
				<span className="slider round" />
			</label>
			<Icon icon={isDarkMode ? "material-symbols:sun" : "material-symbols:moon"} className="icon ml-2 text-xl" />
		</div>
	)
}
