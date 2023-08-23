import { ImageResponse } from "next/server";
import { z } from "zod";

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export const runtime = "edge";

const schema = z.object({
  PUBLIC_URL: z.string(),
});

const env = schema.parse(process.env);

export async function GET() {
  return new ImageResponse(
    (
      <div tw="flex bg-transparent">
        <img
          src={`https://${env.PUBLIC_URL}/icon.svg`}
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
