"use client";
import React from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Trash, CloudUpload } from "lucide-react";
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
  const handleRemove = (url: string) => {
    onRemove(url); // Call the external onRemove to remove image from form
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, idx) => (
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
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset="imageuploadsahlancoding"
        onSuccess={(results: CloudinaryUploadWidgetResults) => {
          const url = (results.info as { url: string }).url;
          onChange([...value, url]); // Directly update the form with the new URL
        }}
      >
        {({ open }) => (
          <Button 
            onClick={(event) => {
              event.preventDefault(); // Prevent default button behavior
              open(); // Call the Cloudinary open method
            }} 
            className="bg-grey-1 text-white"
          >
            <CloudUpload className="mr-3 h-4 w-4" /> Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;









//versi aman
// "use client";
// import React, { useState } from "react";
// import {
//   CldUploadWidget,
//   CloudinaryUploadWidgetResults,
// } from "next-cloudinary";
// import { Trash, CloudUpload } from "lucide-react";

// import { Button } from "../ui/button";
// import Image from "next/image";

// interface ImageUploadProps {
//   value: string[];
//   onChange: (value: string) => void;
//   onRemove: (value: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({
//   value,
//   onChange,
//   onRemove,
// }) => {
//   // sample mamang
//   const [hostedurl, sethostedurl] = useState<string[]>([]);
//   const handleRemove = (url: string) => {
//     //buat remove image
//     sethostedurl((prevUrls) => prevUrls.filter((u) => u !== url));
//     onRemove(url); // Call the external onRemove if needed
//   };

//   return (
//     <div>
//       <div className="mb-4 flex flex-wrap items-center gap-4">
//         {hostedurl?.map((url, idx) => (
//           <div key={idx} className="relative w-[200px] h-[200px]">
//             <div className="absolute top-0 right-0 z-10">
//               <Button
//                 onClick={() => handleRemove(url)}
//                 size="sm"
//                 className="bg-red-1 text-white"
//               >
//                 <Trash className="h-4 w-4" />
//               </Button>
//             </div>
//             <Image
//               className="object-cover rounded-lg"
//               layout="fill"
//               src={url}
//               alt="collection"
//               // width={200}
//               // height={200}
//             />
//           </div>

//         ))}
//       </div>

//       <CldUploadWidget
//         uploadPreset="imageuploadsahlancoding"
//         onSuccess={(results: CloudinaryUploadWidgetResults) => {
//           const url = (results.info as { url: string }).url;
//           sethostedurl((prevhostedurls) => [...prevhostedurls, url]);
//         }}

//       >
//         {({ open }) => {
//           return (
//             <Button onClick={() => open()} className="bg-grey-1 text-white">
//               <CloudUpload className="mr-3 h-4 w-4" /> Upload Image
//             </Button>
//           );
//         }}
//       </CldUploadWidget>
//     </div>
//   );
// };

// export default ImageUpload;
