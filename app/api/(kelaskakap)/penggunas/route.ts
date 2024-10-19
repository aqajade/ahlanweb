//api nya dr app/api/(kelaskakap)/pengguna/route.ts koneksinya di lib/db.ts, blueprint schema infrastructure nya dr lib/models/pengguna sm catatan
import connect from "@/lib/db";
import Pengguna from "@/lib/models/pengguna";
import { NextResponse } from "next/server"

//dibawah ni sekedar cek nembak api aja
// export const GET = async () => {
//   return new NextResponse("my first API")
// }

export const GET = async () => {
  try {
    await connect(); //mastiin db aman sblm request
    const penggunas = await Pengguna.find({});
    return new NextResponse(JSON.stringify(penggunas),{status:200})
  } catch (error) {
    return new NextResponse("Error fetching data pengguna" + error,{status:500})
  }
}

export const POST = async (request:Request) => {
  try {
    const body = await request.json()
    await connect();
    const newPengguna = new Pengguna(body) 
    await newPengguna.save() //simpen ke db
    return new NextResponse(
      JSON.stringify({
        message:"pengguna terbuat",
        pengguna:newPengguna}),
    {status:201})
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Error creating pengguna",
        error
      }),
      {
        status:500
      }
    )
  }
}
