import Providers from "@/src/components/context/Providers"
import Footer from "@/src/components/Footer"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import SideBar from "../components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Task Manager",
	description: "Simple task manager web application."
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers session={session}>
					<Toaster position="top-center" />
					<Header />
					<div className="flex min-h-screen flex-col md:flex-row">
						<Navbar />
						<main className="flex-1">{children}</main>
						<SideBar />
					</div>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
