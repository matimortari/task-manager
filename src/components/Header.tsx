"use client"

import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"

export default function Header() {
	const { data: session } = useSession()
	const userName = session?.user?.name
	const isLoggedIn = !!session

	return (
		<div className="flex w-full items-center justify-between px-4 py-2">
			<div className="flex h-12 items-center justify-center gap-8">
				<Image src="/logo.png" alt="Logo" width={25} height={25} />

				<div className="ml-16">
					<h1 className="text-base font-semibold">👋 Hello, {isLoggedIn ? userName : "Guest"}</h1>
					<span className="text-sm">
						{isLoggedIn ? (
							<h2 className="text-sm">
								You have <span className="font-bold text-accent">5</span> active tasks.
							</h2>
						) : (
							"Please sign in to see your tasks."
						)}
					</span>
				</div>
			</div>

			<div className="flex items-center">
				<button className="btn bg-accent text-sm text-accent-foreground">Create New Task</button>
			</div>

			<div className="flex items-center gap-2">
				<ThemeSwitch />
				{isLoggedIn ? (
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
	)
}
