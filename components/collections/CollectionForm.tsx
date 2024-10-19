"use client";
import { z } from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string().array(),
});

const CollectionForm = () => {
  const router = useRouter(); 
  const [loading, setloading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setloading(true);
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setloading(false);
        toast.success("Collection created, alhamdulillah");
        router.push("/collection");
      } else {
        setloading(false);
        const errorData = await res.json(); // Expecting a JSON error response
        toast.error(errorData.error || "Failed to create collection"); // Access the error message
      }
    } catch (err) {
      console.log("[collections_POST]", err);
      setloading(false);
      toast.error("Error, coba lagi");
    }
  };

  return (
    <div className="p-10 w-screen">
      <p className="text-heading2-bold">Create Collection</p>
      <Separator className="mt-4 mb-7 bg-grey-1" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Put the title here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Put the description here"
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value || []}
                    onChange={(urls) => field.onChange(urls)}
                    onRemove={(url) =>
                      field.onChange(field.value.filter((item) => item !== url))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-1 text-white">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/collections")}
              // onClick={() => router.push("/sign-in")}
              className="bg-blue-1 text-white"
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;

// "use client";
// import { z } from "zod";
// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "../ui/separator";
// import { Textarea } from "../ui/textarea";
// import ImageUpload from "../custom ui/ImageUpload";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   title: z.string().min(2).max(20),
//   description: z.string().min(2).max(500).trim(),
//   // image: z.string(),
//   image: z.string().array(),
// });

// const CollectionForm = () => {
//   const router = useRouter();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       // image: "",
//       image: [],
//     },
//   });

//   const onSubmit = (values: z.infer<typeof formSchema>) => {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log("form submitted mas ",values);
//   };

//   return (
//     <div className="p-10 w-screen">
//       <p className="text-heading2-bold">Create Collection</p>
//       <Separator className="mt-4 mb-7 bg-grey-1" />
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Put the title here" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Put the description here"
//                     {...field}
//                     rows={5}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Image</FormLabel>
//                 <FormControl>
//                   <ImageUpload
//                     // value={field.value ? [field.value] : []} //dkasih ? krn by default g ada apa" kalau ada kita masukin array klo g ad array kosong
//                     value={field.value || []}
//                     // onChange={(url) => field.onChange(url)}
//                     onChange={(url) => field.onChange(url)} //klo udh upload nnt kita ganti link image nya u/ ditampilin
//                     // onRemove={(url) => field.onChange(field.value.filter((item) => item !== url))} // Remove specific UR
//                     onRemove={() => field.onChange([])} //klo diaktifin nnti ngapus jd empty array, kosong dong.
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex gap-10">
//             <Button type="submit" className="bg-blue-1 text-white">
//               Submit
//             </Button>
//             <Button
//               type="button"
//               onClick={() => router.push("/collections")}
//               className="bg-blue-1 text-white"
//             >
//               Discard
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default CollectionForm;
