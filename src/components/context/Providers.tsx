"use client"

/* Wrapper component for the application's context providers
- SessionProvider: Manages Auth.js user sessions
- QueryClientProvider: Sets up the React Query client 
- ReactQueryDevtools: Enables React Query debugging tools in development
- ThemeProvider: Allow theme selection using next-themes
- Analytics: Provides Vercel analytics for tracking user interactions */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Analytics } from "@vercel/analytics/react"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 60 * 1000 } }
})

export default function Providers({
	children,
	session
}: {
	readonly children: ReactNode
	readonly session: Session | null
}) {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
					<Analytics />
				</ThemeProvider>
			</QueryClientProvider>
		</SessionProvider>
	)
}
