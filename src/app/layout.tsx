import authOptions from "./api/auth/[...nextauth]/authOptions";
import "./globals.css";
import FooterBar from "@/components/FooterBar";
import NavBar from "@/components/NavBar";
import AuthSessionProvider from "@/components/auth/AuthSessionProvider";
import type { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { Yanone_Kaffeesatz as Font } from "next/font/google";
import { z } from "zod";

const schema = z.object({
  PUBLIC_URL: z.string(),
});

const env = schema.parse(process.env);

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "***REMOVED***",
    template: "%s | ***REMOVED***",
  },
  description: "Emma Jo's blog",
  metadataBase: new URL(`https://${env.PUBLIC_URL}`),
  icons: "icon?v1",
  twitter: {
    card: "summary_large_image",
    title: "***REMOVED***",
    description: "Emma Jo's blog",
    images: [`https://${env.PUBLIC_URL}/og?v1`],
  },
  openGraph: {
    type: "website",
    title: "***REMOVED***",
    description: "Emma Jo's blog",
    siteName: "***REMOVED***",
    images: [
      {
        url: `https://${env.PUBLIC_URL}/og?v1`,
        width: 1200,
        height: 630,
      },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null | undefined =
    await getServerSession(authOptions);
  return (
    <html lang="en" className="bg-theme-200">
      <body className={font.className}>
        <AuthSessionProvider session={session}>
          <div className="mx-auto flex h-screen w-full max-w-screen-md flex-col justify-between p-4">
            <div className="flex flex-col">
              <NavBar />
              {children}
            </div>
            <FooterBar />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
