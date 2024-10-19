"use client";
import React, { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { CloudUpload, Trash } from "lucide-react";

import { Button } from "../ui/button";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  // referensi asli
  // const [hostedurl, sethostedurl] = useState<string[]>([]); //hostedurl sm sethosted url itu buatan, prevhostedurls jg sama
  // const handleRemove = (url: string) => {
  //   //buat remove image
  //   sethostedurl((prevUrls) => prevUrls.filter((u) => u !== url));
  //   onRemove(url); // Call the external onRemove if needed
  // };

  // const onUpload = (result: any) => {
  //   onChange(result.info.url);
  // };
  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    const url = (result.info as { url: string }).url;
    onChange([...value, url]); // Update state with new URL
  };

  return (
    <div>
      {/* referensi asli */}
      {/*ini container images biar ada gap dan di wrap*/}
      {/* <div className="mb-4 flex flex-wrap items-center gap-4">
        {hostedurl?.map((url, idx) => (
          //dibawah ini div bungkus per image sama button 200px 200px
          <div className="relative w-[200px] h-[200px]">
            <div key={idx}>
              <div className="absolute top-0 right-0 z-10">
                <Button
                  onClick={() => handleRemove(url)}
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
          </div>
        ))}
      </div> */}

      {/* referensi gagalan phuc */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* {value.map((url) => ( */}
        {Array.isArray(value) && value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
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
              width={200}
              height={200}
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* dibawah ini yg versi 1 gambar */}
      {/* {hostedurl && <p>Hostedurl: {hostedurl}</p>}  */}
      {/* dibawah ini bbrp gambar sekalian kalau mau ngambil urlnya*/}
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
        // referensi asli
        // uploadPreset="imageuploadsahlancoding"
        // onSuccess={(results: CloudinaryUploadWidgetResults) => {
        //   const url = (results.info as { url: string }).url;
        //   sethostedurl((prevhostedurls) => [...prevhostedurls, url]);
        // }}

        uploadPreset="imageuploadsahlancoding"
        onSuccess={onUpload}
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
