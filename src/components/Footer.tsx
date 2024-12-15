import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Footer() {
	return (
		<footer className="flex flex-col items-center justify-between md:flex-row">
			<div className="m-2 font-light text-muted-foreground">
				<p>© 2024 Matheus Mortari. All rights reserved.</p>
			</div>

			<div className="m-4 flex flex-row gap-4 text-muted-foreground">
				<Link href="https://github.com/matimortari" target="_blank" aria-label="GitHub">
					<Icon icon="simple-icons:github" className="icon h-6 w-6" />
				</Link>
				<Link href="https://www.linkedin.com/in/matheus-mortari-19rt" target="_blank" aria-label="LinkedIn">
					<Icon icon="simple-icons:linkedin" className="icon h-6 w-6" />
				</Link>
			</div>
		</footer>
	)
}
