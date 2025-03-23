import Providers from "@/src/components/context/Providers"
import { TasksProvider } from "@/src/components/context/TaskContext"
import Footer from "@/src/components/Footer"
import Header from "@/src/components/Header"
import Navbar from "@/src/components/Navbar"
import Overview from "@/src/components/Overview"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import "@/src/styles/inputs.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	metadataBase: new URL("https://wdc-task-manager.vercel.app"),
	title: "Task Manager",
	description: "Simple task manager web application.",
	keywords: ["Task Manager", "Task", "Task App", "Task Manager Page"],
	openGraph: {
		url: "https://wdc-task-manager.vercel.app",
		title: "Task Manager",
		description: "Simple task manager web application.",
		type: "website",
		images: "/og-image.png"
	},
	other: {
		"google-site-verification": "2j0bcfhh8FCYPpzFylzbiPjl3Pa0X7lMuG060ctsCsA"
	}
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers session={session}>
					<TasksProvider>
						<Toaster position="top-center" />
						<Header />
						<div className="flex flex-col md:flex-row">
							<Navbar />
							{children}
							<Overview />
						</div>
						<Footer />
					</TasksProvider>
				</Providers>
			</body>
		</html>
	)
}
