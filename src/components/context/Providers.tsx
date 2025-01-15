/* Wrapper component for the main providers used in the application
- SessionProvider: Manages user authentication sessions using NextAuth.js
- QueryClientProvider: Sets up React Query for data fetching and caching
- ReactQueryDevtools: Enables React Query debugging tools in development
- ThemeProvider: Adds support for light/dark theme selection using next-themes
- Analytics: Provides Vercel analytics for tracking user interactions */

"use client"

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

export default function Providers({ children, session }: { children: ReactNode; session: Session | null }) {
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
