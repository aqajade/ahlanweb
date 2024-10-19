"use client";
import React, { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Trash, CloudUpload } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  // value: string[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  // sample mamang
  const [hostedurl, sethostedurl] = useState<string[]>([]);
  const handleRemove = (url: string) => {
    //buat remove image
    sethostedurl((prevUrls) => prevUrls.filter((u) => u !== url));
    onRemove(url); // Call the external onRemove if needed
  };

  // onupload phuc antara aneh ama gaguna
  // const onUpload = (result: any) => {
  //   onChange(result.info.secure_url);
  // };

  return (
    <div>
      {/* <div className="mb-4 flex flex-wrap items-center gap-4">
        {value && value.length > 0 ? value.map((url) => (
        // {value.map((url) => (
          <div className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
            <Button
                onClick={() => onRemove(url)}
                // onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              width={200}
              height={200}
            />
          </div>
          // <Image
          //   src={url}
          //   alt="collection"
          //   className="object-cover rounded-lg"
          //   width={200}
          //   height={200}
          // />
          // onSuccess={onUpload}
        // )) : <p>No images uploaded.</p>}
      </div> */}

      <div className="mb-4 flex flex-wrap items-center gap-4">
        {hostedurl?.map((url, idx) => (
          <div key={idx} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => handleRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              className="object-cover rounded-lg"
              layout="fill"
              src={url}
              alt="collection"
              // width={200}
              // height={200}
            />
          </div>
          // <Image
          //   src={url}
          //   alt="collection"
          //   className="object-cover rounded-lg"
          //   width={200}
          //   height={200}
          // />
          // onSuccess={onUpload}
        ))}
      </div>

      {/* dibawah ini yg versi 1 gambar */}
      {/* {hostedurl && <p>Hostedurl: {hostedurl}</p>}  */}
      {/* dibawah ini bbrp gambar */}
      {/* {hostedurl?.map((url, idx) => (
        <div key={idx}>
          <Image
            src={url}
            alt="collection"
            className="object-cover rounded-lg"
            width={200}
            height={200}
          />
          <li>{url}</li>
        </div>
      ))} */}
      <CldUploadWidget
        uploadPreset="imageuploadsahlancoding"
        onSuccess={(results: CloudinaryUploadWidgetResults) => {
          const url = (results.info as { url: string }).url;
          sethostedurl((prevhostedurls) => [...prevhostedurls, url]);
        }}
      >
        {({ open }) => {
          return (
            <Button onClick={() => open()} className="bg-grey-1 text-white">
              <CloudUpload className="mr-3 h-4 w-4" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
