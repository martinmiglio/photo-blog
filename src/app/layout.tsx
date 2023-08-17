import "./globals.css";
import FooterBar from "@/components/FooterBar";
import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import { Yanone_Kaffeesatz as Font } from "next/font/google";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "***REMOVED***",
    template: "%s | ***REMOVED***",
  },
  description: "Emma Jo's blog",
  metadataBase: new URL("https://www.***REMOVED***/"),
  icons: "icon?v1",
  twitter: {
    card: "summary_large_image",
    title: "***REMOVED***",
    description: "Emma Jo's blog",
    images: ["https://www.***REMOVED***/og?v2"],
  },
  openGraph: {
    type: "website",
    title: "***REMOVED***",
    description: "Emma Jo's blog",
    siteName: "***REMOVED***",
    images: [
      {
        url: "https://www.***REMOVED***/og?v2",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-theme-200">
      <body className={font.className}>
        <div className="mx-auto flex h-screen w-full max-w-screen-md flex-col justify-between p-4">
          <div>
            <NavBar />
            {children}
          </div>
          <FooterBar />
        </div>
      </body>
    </html>
  );
}
