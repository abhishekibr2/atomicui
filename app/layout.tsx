import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from 'nextjs-toploader';
import TopLoader from "@/utils/TopLoader";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Atomic UI",
  description: "Atomic UI is a collection of atomic design components.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>

      <body className="bg-background text-foreground">
        <TopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <main className="flex flex-col min-h-screen ">
            {children}
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
