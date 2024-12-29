"use client"

import Profile from "./Profile"
import RadialChart from "./RadialChart"

export default function SideBar() {
	return (
		<div className="my-6 flex h-full flex-col items-center justify-between">
			<div className="mx-4 flex items-center justify-between">
				<Profile />
			</div>

			<div className="mx-4 flex items-center justify-between md:mb-28">
				<RadialChart />
			</div>
		</div>
	)
}
