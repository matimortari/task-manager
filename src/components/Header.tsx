"use client"

import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useTasks } from "./context/TaskContext"
import AddTaskDialog from "./dialogs/AddTaskDialog"
import ThemeSwitch from "./ThemeSwitch"

export default function Header() {
	const { data: session } = useSession()
	const { activeTasks } = useTasks()
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleDialogClose = () => {
		setIsDialogOpen(false)
	}

	return (
		<div className="relative flex w-full flex-col items-center justify-between px-4 py-2 sm:flex-row">
			<Image src="/logo.png" alt="Logo" width={50} height={50} className="absolute left-4 top-4" />

			<div className="flex w-full flex-col items-center justify-between gap-8 sm:flex-row sm:gap-8 md:ml-24">
				<div className="mt-2 w-full text-center sm:w-auto sm:text-left">
					<h1 className="text-base font-semibold">👋 Hello, {session ? session.user.name : "Guest"}</h1>
					<span className="text-sm">
						{session ? (
							<h2 className="text-sm">
								You have <span className="font-bold text-accent">{activeTasks.length}</span> active tasks.
							</h2>
						) : (
							"Please sign in to see your tasks."
						)}
					</span>
				</div>

				<div className="mt-2 flex w-full justify-center sm:mt-0 sm:w-auto sm:justify-end">
					<button onClick={() => setIsDialogOpen(true)} className="btn bg-primary text-sm">
						Add New Task
					</button>
				</div>

				<div className="mt-2 flex items-center gap-2 sm:mt-0">
					<ThemeSwitch />
					{session ? (
						<button
							onClick={() => signOut()}
							className="flex size-10 items-center justify-center rounded-full border hover:border-muted"
						>
							<Icon icon="mdi:logout" className="size-5" />
						</button>
					) : (
						<Link
							href="/login"
							className="flex size-10 items-center justify-center rounded-full border hover:border-muted"
						>
							<Icon icon="mdi:login" className="size-5" />
						</Link>
					)}
				</div>
			</div>

			<AddTaskDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
		</div>
	)
}
