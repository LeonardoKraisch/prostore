import type { Metadata } from "next";
import localFont from "next/font/local";
import "../assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import DemoBanner from "@/components/shared/demo-banner";

const inter = localFont({
  src: [
    { path: "../public/fonts/inter/Inter-Regular.woff2", weight: "400" },
    { path: "../public/fonts/inter/Inter-Medium.woff2", weight: "500" },
    { path: "../public/fonts/inter/Inter-SemiBold.woff2", weight: "600" },
    { path: "../public/fonts/inter/Inter-Bold.woff2", weight: "700" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL),
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: SERVER_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <DemoBanner />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
