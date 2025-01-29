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
		<div className="flex w-full flex-col items-center justify-between pt-6 sm:flex-row md:p-2">
			<Image src="/logo.png" alt="Logo" width={35} height={35} className="absolute left-4 top-4" />

			<div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row md:ml-28">
				<div className="w-full text-center sm:w-auto sm:text-left">
					<h4 className="font-semibold">Hello, {session ? session.user.name : "Guest"} 👋</h4>
					{session ? (
						<div className="flex flex-row items-center justify-center md:justify-start">
							<p className="text-start text-xs font-medium">
								You have <span className="font-bold text-accent">{activeTasks.length}</span> active tasks.{" "}
								<span className="block md:hidden">
									Create a{""}
									<button className="font-bold text-primary" onClick={() => setIsDialogOpen(true)}>
										new task.
									</button>
								</span>
							</p>
						</div>
					) : (
						<p className="text-start text-xs font-medium">Please sign in to see your tasks.</p>
					)}
				</div>

				{session ? (
					<div className="hidden w-full justify-center sm:w-auto sm:justify-end md:block">
						<button onClick={() => setIsDialogOpen(true)} className="btn bg-primary">
							Add New Task
						</button>
					</div>
				) : (
					<div />
				)}

				<div className="flex items-center gap-2">
					<ThemeSwitch />

					{session ? (
						<button onClick={() => signOut()} className="flex items-center justify-center rounded-full border p-2">
							<Icon icon="mdi:logout" className="size-6" />
						</button>
					) : (
						<Link href="/login" className="flex items-center justify-center rounded-full border p-2">
							<Icon icon="mdi:login" className="size-6" />
						</Link>
					)}
				</div>
			</div>

			<AddTaskDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
		</div>
	)
}
