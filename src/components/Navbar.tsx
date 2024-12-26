import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Navbar() {
	const navItems = [
		{
			icon: <Icon icon="mdi:grid-large" className="icon size-6 text-primary hover:text-secondary" />,
			title: "All",
			link: "/"
		},
		{
			icon: <Icon icon="mdi:stopwatch-check-outline" className="icon size-6 text-primary hover:text-secondary" />,
			title: "Completed",
			link: "/completed"
		},
		{
			icon: <Icon icon="mdi:stopwatch-play-outline" className="icon size-6 text-primary hover:text-secondary" />,
			title: "Pending",
			link: "/pending"
		},
		{
			icon: <Icon icon="mdi:stopwatch-alert-outline" className="icon size-6 text-primary hover:text-secondary" />,
			title: "Overdue",
			link: "/overdue"
		}
	]

	return (
		<div className="flex flex-col px-2">
			<div className="mt-12 flex flex-1 flex-col items-center justify-between">
				<ul className="flex flex-col gap-8">
					{navItems.map((item, index) => (
						<li className="group relative" key={index}>
							<Link href={item.link}>
								{item.icon}
								<span className="absolute left-8 top-1/2 translate-y-1/2 rounded-lg bg-accent p-1 text-xs text-accent-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									{item.title}
								</span>
							</Link>
						</li>
					))}
				</ul>

				<div className="mb-24">
					<button className="flex size-10 items-center justify-center rounded-full border border-destructive text-destructive hover:border-muted">
						<Icon icon="mdi:remove-bold" className="icon size-6" />
					</button>
				</div>
			</div>
		</div>
	)
}
