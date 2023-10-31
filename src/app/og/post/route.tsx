/* eslint-disable @next/next/no-img-element */
import config from "@/../tailwind.config.js";
import { User } from "@/db/auth";
import { Post } from "@/db/post";
import { ImageResponse } from "next/og";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "edge";

const { theme } = config.theme.colors;

const schema = z.object({
  BLOG_TITLE: z.string(),
  PUBLIC_URL: z.string(),
  CDN_DOMAIN: z.string(),
});

const env = schema.parse(process.env);

export async function GET(req: NextRequest) {
  try {
    const { searchParams, hostname, protocol, port } = req.nextUrl;
    const portString = port ? `:${port}` : "";
    const basePath = protocol + "//" + hostname + portString;
    const slug = searchParams.get("slug");

    if (!searchParams.has("slug") || !slug) {
      // return the image at /og if no slug is provided
      return NextResponse.redirect(`${basePath}/og`);
    }

    let res = await fetch(`${basePath}/api/post?slug=` + slug);
    const post = (await res.json()) as Post;

    res = await fetch(`${basePath}/api/user?id=` + post.authorId);
    const user = (await res.json()) as User | null;

    const fontDataBold = await fetch(
      new URL("../../../assets/Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const PFP_SIZE = 110;

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: theme[200],
            fontFamily: '"Bold"',
          }}
          tw={`w-full h-full flex flex-col text-[${theme[900]}]`}
        >
          <div tw="flex flex-col items-center">
            <h1 style={{}} tw="pt-8 text-9xl">
              {env.BLOG_TITLE}
            </h1>
          </div>
          <div tw="flex flex-col mx-16 flex-grow">
            <div tw="flex text-5xl mb-2">
              <div
                tw={`flex m-2 mr-6 h-[${PFP_SIZE}px] w-[${PFP_SIZE}px] overflow-hidden rounded-full`}
              >
                <img
                  src={user?.image ?? `https://${env.CDN_DOMAIN}/pfp.jpg`}
                  width={PFP_SIZE}
                  height={PFP_SIZE}
                  alt="pfp"
                />
              </div>
              <h2 tw="my-auto top-[0.12rem]">{user?.name} </h2>
              <h3 tw="opacity-50 my-auto top-[0.12rem] ml-2">
                {post.timestamp &&
                  `-  ${new Date(post.timestamp).toLocaleString(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}`}
              </h3>
            </div>
            <h4 tw="flex text-7xl my-auto">&quot;{post.title}&quot;</h4>
          </div>
          <h5
            tw={`text-[${theme[900]}] opacity-30 p-8 text-3xl mt-auto ml-auto`}
          >
            {env.PUBLIC_URL}/post/{post.slug.slice(0, 9)}...
          </h5>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Bold",
            data: fontDataBold,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
