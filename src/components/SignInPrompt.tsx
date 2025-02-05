import { Icon } from "@iconify/react"
import { useState } from "react"
import SignInDialog from "./dialogs/SignInDialog"

export default function SignInPrompt() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const handleDialogClose = () => setIsDialogOpen(false)

	return (
		<div className="card m-2 flex min-h-screen w-full items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4 text-center">
				<Icon icon="mdi:account-badge-warning" className="size-16 text-accent" />
				<h2 className="font-bold">You are not signed in yet.</h2>
				<h4 className="text-muted-foreground">
					Please{" "}
					<button onClick={() => setIsDialogOpen(true)} className="font-bold text-primary">
						sign in
					</button>{" "}
					to view and manage your tasks now :)
				</h4>
			</div>

			<SignInDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
		</div>
	)
}
