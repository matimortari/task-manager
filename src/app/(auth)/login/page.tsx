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
			<div className="card flex w-2/6 flex-col items-center justify-center">
				<strong className="p-4 text-6xl">Sign In</strong>
				<p className="text-muted-foreground">Sign in with your preferred provider.</p>

				<hr className="my-6 w-full" />

				<div className="my-4 flex flex-col items-center justify-center gap-4">
					<button className="btn bg-google text-white" onClick={() => signIn("google")}>
						<Icon icon="simple-icons:google" className="icon" />
						Sign In With Google
					</button>
					<button className="btn bg-github text-white" onClick={() => signIn("github")}>
						<Icon icon="simple-icons:github" className="icon" />
						Sign In With GitHub
					</button>
				</div>
			</div>
		</div>
	)
}
