/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";

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
          tw="w-full h-full flex flex-col pl-12"
        >
          <div tw="flex flex-col items-center">
            <h1
              style={{ fontFamily: '"Bold"' }}
              tw="text-[#3D0A1F] py-8 text-9xl"
            >
              toadtopia
            </h1>
            <img
              src="https://www.toadtopia.rocks/icon.svg"
              alt="toadtopia"
              height={350}
              width={350}
            />
          </div>
          <h4 tw="text-[#3D0A1F] opacity-30 p-8 text-5xl mt-auto ml-auto">
            toadtopia.rocks
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
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
