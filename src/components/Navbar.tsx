import { Icon } from "@iconify/react"
import Link from "next/link"

export default function Navbar() {
	const navItems = [
		{
			icon: <Icon icon="mdi:grid-large" className="icon size-6 text-primary hover:text-accent" />,
			title: "All",
			link: "/"
		},
		{
			icon: <Icon icon="mdi:stopwatch-check-outline" className="icon size-6 text-primary hover:text-accent" />,
			title: "Completed",
			link: "/completed"
		},
		{
			icon: <Icon icon="mdi:stopwatch-play-outline" className="icon size-6 text-primary hover:text-accent" />,
			title: "Active",
			link: "/active"
		},
		{
			icon: <Icon icon="mdi:stopwatch-alert-outline" className="icon size-6 text-primary hover:text-accent" />,
			title: "Overdue",
			link: "/overdue"
		}
	]

	return (
		<div className="my-2 flex h-full flex-row items-center justify-between px-12 md:my-6 md:flex-col">
			<ul className="flex flex-row gap-8 md:flex-col">
				{navItems.map((item, index) => (
					<li className="group relative" key={index}>
						<Link href={item.link}>
							{item.icon}
							<span className="tooltip">{item.title}</span>
						</Link>
					</li>
				))}
			</ul>

			<div className="mt-auto md:mb-36">
				<button className="flex size-10 items-center justify-center rounded-full border border-destructive text-destructive hover:border-muted">
					<Icon icon="mdi:remove-bold" className="icon size-6" />
				</button>
			</div>
		</div>
	)
}
