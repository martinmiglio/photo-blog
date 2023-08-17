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
  description: "emma jo's blog",
  icons: "icon",
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
            <div className="flex">{children}</div>
          </div>
          <FooterBar />
        </div>
      </body>
    </html>
  );
}
