/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div tw="flex bg-transparent">
        <img
          src="https://www.toadtopia.rocks/icon.svg"
          alt="toadtopia"
          height={64}
          width={64}
        />
      </div>
    ),
    {
      width: 64,
      height: 64,
    },
  );
}
