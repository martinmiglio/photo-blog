import NextImage, { ImageProps } from "next/image";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#F8A5D0" offset="20%" />
      <stop stop-color="#F8C4DC" offset="50%" />
      <stop stop-color="#F8A5D0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#F8A5D0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function Image(props: ImageProps) {
  const { src, width, height, ...rest } = props;
  return (
    <NextImage
      src={src}
      width={width}
      height={height}
      placeholder={`data:image/svg+xml;base64,${toBase64(
        shimmer(width as number, height as number),
      )}`}
      {...rest}
    />
  );
}
