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
				<header className="m-4 flex flex-col gap-2 text-center md:text-start">
					<h2>Sign In</h2>
					<p className="text-lg text-muted-foreground">Sign in with your preferred provider.</p>
				</header>

				<hr className="my-4 w-full" />

				<div className="my-8 flex flex-col items-center justify-center gap-4">
					<button className="btn bg-[#db4437] text-white" onClick={() => signIn("google")}>
						<Icon icon="simple-icons:google" className="icon size-6" />
						Sign In With Google
					</button>

					<button className="btn bg-[#333333] text-white" onClick={() => signIn("github")}>
						<Icon icon="simple-icons:github" className="icon size-6" />
						Sign In With GitHub
					</button>
				</div>
			</div>
		</div>
	)
}
