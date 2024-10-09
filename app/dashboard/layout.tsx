import SessionWrapper from "@/components/SessionWrapper"
import "@/styles/globals.css";
import { Providers } from "../providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";

export default function DashboardLayout({ children }) {
        return (
                <SessionWrapper>
                        <html suppressHydrationWarning lang="en">
                                <head />
                                <body
                                        className={clsx(
                                                "min-h-screen bg-background font-sans antialiased",
                                                fontSans.variable,
                                        )}
                                >
                                        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                                                <div className="relative flex flex-col h-screen">
                                                        <main className="container mx-auto pt-16 px-6 flex-grow">
                                                                {children}
                                                        </main>
                                                </div>
                                        </Providers>
                                </body>
                        </html>
                </SessionWrapper>

        )
}
