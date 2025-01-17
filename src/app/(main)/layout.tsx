import Providers from "@/src/components/context/Providers"
import { TasksProvider } from "@/src/components/context/TaskContext"
import Footer from "@/src/components/Footer"
import Header from "@/src/components/Header"
import Navbar from "@/src/components/Navbar"
import Sidebar from "@/src/components/Sidebar"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Task Manager",
	description: "Simple task manager web application.",
	keywords: ["Task Manager", "Task", "Task App", "Task Manager Page"],
	openGraph: {
		url: "https://wdc-task-manager.vercel.app/",
		images: "/cover.png",
		title: "Task Manager",
		description: "Simple task manager web application.",
		type: "website"
	},
	other: {
		"google-site-verification": "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA"
	}
}

export default async function RootLayout({ children }: { children: ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers session={session}>
					<TasksProvider>
						<Toaster position="top-center" />
						<Header />
						<div className="flex min-h-screen flex-col md:flex-row">
							<div className="w-full md:w-min">
								<Navbar />
							</div>
							<div className="flex-1">{children}</div>
							<div className="w-full md:w-3/12">
								<Sidebar />
							</div>
						</div>
						<Footer />
					</TasksProvider>
				</Providers>
			</body>
		</html>
	)
}
