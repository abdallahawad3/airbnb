/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { BiImageAdd } from "react-icons/bi";
declare global {
  var cloudinary: any;
}
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload} // Correct callback
      uploadPreset="abdullah"
      options={{ maxFiles: 1 }}
      onError={(error: any) => console.error("Upload error:", error)}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative overflow-hidden cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <BiImageAdd size={40} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  className="object-contain w-full h-full"
                  src={value}
                  width={700}
                  height={700}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
