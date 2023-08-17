import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import { useState } from "react";

export default function PhotoUpload({
  handleFileChange: hook,
}: {
  handleFileChange?: (url: string) => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>();
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileChange = async (file: File) => {
    let { url } = await uploadToS3(file);
    hook?.(url);
    setImageUrl(url);
  };

  return (
    <div>
      <FileInput onChange={handleFileChange} />
      {!imageUrl ? (
        <button
          onClick={openFileDialog}
          className="h-[432px] max-w-[768px] w-full rounded border-b-4 border-theme-700 bg-theme-500 text-xl font-bold text-theme-50 hover:border-theme-500 hover:bg-theme-400"
        >
          <span className="inline-flex items-center">
            <svg
              className="mr-2 h-4 w-4 rotate-180 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            Upload photo
          </span>
        </button>
      ) : (
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          width={768}
          height={432}
          className="my-2"
        />
      )}
    </div>
  );
}
