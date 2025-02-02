"use client"

import useDialog from "@/src/hooks/useDialog"
import { Icon } from "@iconify/react"
import { signIn } from "next-auth/react"
import { useEffect } from "react"

export default function SignInDialog({ isOpen, onClose }) {
	const { dialogRef } = useDialog(onClose, isOpen)

	useEffect(() => {
		if (!isOpen) return
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
			<div ref={dialogRef} className="popover">
				<h3>Sign In</h3>
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
