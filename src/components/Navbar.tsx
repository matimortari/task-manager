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
		<div className="m-4 flex flex-row items-center justify-center md:my-12 md:flex-col md:items-center md:justify-start">
			<ul className="flex flex-row items-center gap-12 md:flex-col">
				{navItems.map((item) => (
					<li className="group relative" key={item.title}>
						<Link href={item.link}>
							{item.icon}
							<span className="tooltip hidden md:block">{item.title}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
