"use client"

import Profile from "./Profile"
import RadialChart from "./RadialChart"

export default function SideBar() {
	return (
		<div className="mt-12 flex flex-col items-center justify-between">
			<Profile />

			<div className="m-4 flex flex-col items-center justify-between gap-2">
				<RadialChart />
			</div>
		</div>
	)
}
