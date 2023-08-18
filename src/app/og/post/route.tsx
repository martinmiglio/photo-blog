/* eslint-disable @next/next/no-img-element */
import { Post } from "@/types/Post/Post";
import { ImageResponse, NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    console.log(req.nextUrl.basePath);
    const { searchParams, hostname, protocol, port } = req.nextUrl;
    const portString = port ? `:${port}` : "";
    const basePath = protocol + "//" + hostname + portString;
    const slug = searchParams.get("slug");

    console.log(slug);

    if (!searchParams.has("slug") || !slug) {
      // return the image at /og if no slug is provided
      return NextResponse.redirect(`${basePath}/og`);
    }

    const res = await fetch(`${basePath}/api/post?slug=` + slug);
    const post = (await res.json()) as Post;

    const fontDataBold = await fetch(
      new URL("../../../assets/YanoneKaffeesatz-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const fontDataRegular = await fetch(
      new URL("../../../assets/YanoneKaffeesatz-Regular.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const PFP_SIZE = 110;

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#F8C4DC",
            fontFamily: '"Regular"',
          }}
          tw="w-full h-full flex flex-col text-[#3D0A1F]"
        >
          <div tw="flex flex-col items-center">
            <h1 style={{ fontFamily: '"Bold"' }} tw="pt-8 text-9xl">
              toadtopia
            </h1>
          </div>
          <div tw="flex flex-col mx-16 flex-grow">
            <div tw="flex text-6xl mb-2">
              <div
                tw={`flex m-2 mr-6 h-[${PFP_SIZE}px] w-[${PFP_SIZE}px] overflow-hidden rounded-full`}
              >
                <img
                  src="https://www.toadtopia.rocks/pfp.jpg"
                  width={PFP_SIZE}
                  height={PFP_SIZE}
                  alt="pfp"
                />
              </div>
              <h2 tw="my-auto top-[0.12rem]">{post.author} </h2>
              <h3 tw="opacity-50 my-auto top-[0.12rem] ml-2">
                {post.timestamp &&
                  `-  ${new Date(post.timestamp).toLocaleString(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}`}
              </h3>
            </div>
            <h4 tw="flex text-9xl my-auto">&quot;{post.title}&quot;</h4>
          </div>
          <h5 tw="text-[#3D0A1F] opacity-30 p-8 text-5xl mt-auto ml-auto">
            toadtopia.rocks/post/{post.slug.slice(0, 9)}...
          </h5>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Regular",
            data: fontDataRegular,
            style: "normal",
          },
          {
            name: "Bold",
            data: fontDataBold,
            style: "normal",
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
