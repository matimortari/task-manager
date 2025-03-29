"use client"

import { useTasks } from "@/src/components/context/TaskContext"
import AddTaskDialog from "@/src/components/dialogs/AddTaskDialog"
import SignInDialog from "@/src/components/dialogs/SignInDialog"
import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Header() {
	const { data: session } = useSession()
	const { activeTasks } = useTasks()
	const { theme, setTheme } = useTheme()

	const [mounted, setMounted] = useState(false)
	const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
	const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)

	const handleTaskDialogClose = () => setIsTaskDialogOpen(false)
	const handleSignInDialogClose = () => setIsSignInDialogOpen(false)

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light")
	}

	const themeTitle = theme === "light" ? "Light" : "Dark"

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<div className="flex w-full flex-col items-center justify-between pt-8 sm:flex-row md:p-2">
			<Image src="/logo.png" alt="Logo" width={35} height={35} className="absolute left-4 top-4" />

			<div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row md:ml-28">
				<div className="w-full text-center sm:w-auto sm:text-left">
					<h4 className="font-semibold">Hello, {session ? session.user.name : "Guest"} 👋</h4>
					{session ? (
						<div className="flex flex-row items-center justify-center md:justify-start">
							<p className="text-xs font-medium md:text-start">
								You have <span className="font-bold text-accent">{activeTasks.length}</span> active tasks.{" "}
								<span className="block md:hidden">
									Create a{" "}
									<button onClick={() => setIsTaskDialogOpen(true)} className="text-primary">
										New Task
									</button>
								</span>
							</p>
						</div>
					) : (
						<p className="text-xs font-medium md:text-start">Please sign in to see your tasks.</p>
					)}
				</div>

				{session ? (
					<div className="hidden w-full justify-center sm:w-auto sm:justify-end md:block">
						<button onClick={() => setIsTaskDialogOpen(true)} className="btn bg-primary">
							Add New Task
						</button>
					</div>
				) : (
					<div />
				)}

				<div className="flex items-center gap-2">
					<div className="flex items-center justify-start gap-2">
						<span className="text-xs font-semibold">Theme: {themeTitle}</span>
						<label htmlFor="theme-switch" className="relative inline-block h-4 w-8">
							<span className="sr-only">Toggle Theme</span>
							<input id="theme-switch" type="checkbox" className="size-0 opacity-0" onChange={handleThemeToggle} />
							<span className="slider round" />
						</label>
					</div>

					{session ? (
						<button onClick={() => signOut()} className="flex items-center justify-center rounded-full border p-2">
							<Icon icon="mdi:logout" className="size-6" />
						</button>
					) : (
						<>
							<button
								onClick={() => setIsSignInDialogOpen(true)}
								className="flex items-center justify-center rounded-full border p-2"
							>
								<Icon icon="mdi:login" className="size-6" />
							</button>

							<SignInDialog isOpen={isSignInDialogOpen} onClose={handleSignInDialogClose} />
						</>
					)}
				</div>
			</div>

			<AddTaskDialog isOpen={isTaskDialogOpen} onClose={handleTaskDialogClose} />
		</div>
	)
}
