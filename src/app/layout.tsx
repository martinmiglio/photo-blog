import authOptions from "./api/auth/[...nextauth]/authOptions";
import "./globals.css";
import AuthSessionProvider from "@/components/auth/AuthSessionProvider";
import FooterBar from "@/components/page/FooterBar";
import NavBar from "@/components/page/NavBar";
import type { Metadata } from "next";
import { Session, getServerSession } from "next-auth";
import { Yanone_Kaffeesatz as Font } from "next/font/google";
import Script from "next/script";
import { z } from "zod";

const schema = z.object({
  BLOG_TITLE: z.string(),
  BLOG_DESCRIPTION: z.string(),
  PUBLIC_URL: z.string(),
  ANALYTICS_ID: z.string(),
  ANALYTICS_URL: z.string(),
});

const env = schema.parse(process.env);

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: env.BLOG_TITLE,
    template: `%s | ${env.BLOG_TITLE}`,
  },
  description: env.BLOG_DESCRIPTION,
  metadataBase: new URL(`https://${env.PUBLIC_URL}`),
  icons: `https://${env.PUBLIC_URL}/icon?v2`,
  twitter: {
    card: "summary_large_image",
    title: env.BLOG_TITLE,
    description: env.BLOG_DESCRIPTION,
    images: [`https://${env.PUBLIC_URL}/og?v1`],
  },
  openGraph: {
    type: "website",
    title: env.BLOG_TITLE,
    description: env.BLOG_DESCRIPTION,
    siteName: env.BLOG_TITLE,
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
      <head>
        <Script
          async
          src={env.ANALYTICS_URL}
          data-website-id={env.ANALYTICS_ID}
        />
      </head>
      <body className={font.className}>
        <AuthSessionProvider session={session}>
          <div className="mx-auto flex h-screen w-full max-w-screen-md flex-col justify-between px-4">
            <div className="flex flex-col">
              <NavBar title={env.BLOG_TITLE} />
              {children}
            </div>
            <FooterBar />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
