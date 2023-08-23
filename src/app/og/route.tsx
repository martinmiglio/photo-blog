import { ImageResponse } from "next/server";
import { z } from "zod";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const runtime = "edge";

const schema = z.object({
  PUBLIC_URL: z.string(),
  BLOG_TITLE: z.string(),
});

const env = schema.parse(process.env);
export async function GET() {
  try {
    const fontDataBold = await fetch(
      new URL("../../assets/YanoneKaffeesatz-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const fontDataRegular = await fetch(
      new URL("../../assets/YanoneKaffeesatz-Regular.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "#F8C4DC",
            fontFamily: '"Regular"',
          }}
          tw="w-full h-full flex flex-col"
        >
          <div tw="flex flex-col items-center">
            <h1
              style={{ fontFamily: '"Bold"' }}
              tw="text-[#3D0A1F] py-8 text-9xl"
            >
              {env.BLOG_TITLE}
            </h1>
            <img
              src={`https://${env.PUBLIC_URL}/icon.svg`}
              height={350}
              width={350}
            />
          </div>
          <h4 tw="text-[#3D0A1F] opacity-30 p-8 text-5xl mt-auto ml-auto">
            {env.PUBLIC_URL}
          </h4>
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
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
