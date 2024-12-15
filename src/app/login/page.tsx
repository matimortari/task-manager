"use client"

import { Icon } from "@iconify/react"
import { signIn, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Login() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/")
	}

	return (
		<div className="m-8 flex h-screen flex-col items-center">
			<div className="flex flex-col items-center justify-center p-8">
				<strong className="p-4 text-5xl">Sign In</strong>
				<p className="text-muted-foreground">Sign in with your preferred provider.</p>

				<hr className="my-6 w-full border-muted" />

				<div className="flex flex-col items-center justify-center gap-2">
					<button className="button bg-google text-accent-foreground" onClick={() => signIn("google")}>
						<Icon icon="simple-icons:google" className="icon" />
						Sign In With Google
					</button>
					<button className="button bg-github text-accent-foreground" onClick={() => signIn("github")}>
						<Icon icon="simple-icons:github" className="icon" />
						Sign In With GitHub
					</button>
				</div>
			</div>
		</div>
	)
}
