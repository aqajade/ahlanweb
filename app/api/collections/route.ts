import { connectToDB } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collection";






export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized - Please Login/SignUp" }, { status: 403 });
    }

    await connectToDB();
    const { title, description, image } = await req.json();
    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return NextResponse.json({ error: "Collection exists, use another title" }, { status: 400 });
    }

    if (!title || !image) {
      return NextResponse.json({ error: "Title and image are required" }, { status: 400 });
    }

    const newCollection = await Collection.create({ title, description, image });
    await newCollection.save();
    return NextResponse.json(newCollection, { status: 200 });
    
  } catch (err) {
    console.log("[collections_POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}





// import { connectToDB } from "@/lib/mongodb";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import Collection from "@/lib/Collection";

// // u/ POST request mbuat collection di mongodb
// export const POST = async(req:NextRequest)=>{
//   try{
//     const {userId} = auth() //otentikasi akun dr clerk
//     if (!userId){ //klo blm dilempar
//       return new NextResponse("Unauthorized - Please Login/SignUp",{status:403})
//     }
//     await connectToDB() //klo dr clerk aman sambung ke db
//     const{title,description,image} = await req.json() //tarik data dr form 
//     const existingCollection = await Collection.findOne({title}) //cek ada yg sama/ga
//     if (existingCollection){ //klo ada cancel
//       return new NextResponse("Collection exists use other title",{status:400})
//     }
//     if (!title || !image){ //wajib isi title & image
//       return new NextResponse("Title and image are required", {status:400})
//     } 
//     const newCollection = await Collection.create({ //klo title image ada buat collection
//       title,description,image
//     })
//     await newCollection.save()
//     return NextResponse.json(newCollection,{status:200}) //save collectionny format json
//   } catch (err){
//     console.log("[collections_POST]",err)
//     return new NextResponse("internal server error",{status:500})
//   }
// }