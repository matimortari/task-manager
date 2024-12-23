"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import ThemeSwitch from "./ThemeSwitch"

export default function Header() {
	const { data: session } = useSession()

	return (
		<div className="flex w-full items-center justify-between px-4 pt-2">
			<div className="flex h-12 items-center justify-center gap-8">
				<Image src="/logo.png" alt="Logo" width={25} height={25} />
				<div>
					<h1 className="text-base font-medium">{session ? `👋 Hello, ${session.user.name}` : "Hello"}</h1>
					{session ? (
						<span className="text-sm">
							You have <span className="font-bold text-accent">5</span> active tasks.
						</span>
					) : (
						<span className="text-sm">Please sign in to see your tasks.</span>
					)}
				</div>
			</div>

			<div className="flex items-center">
				<button className="btn bg-accent text-sm text-accent-foreground">Create New Task</button>
			</div>

			<div className="flex items-center">
				<ThemeSwitch />
			</div>
		</div>
	)
}
