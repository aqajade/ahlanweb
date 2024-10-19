import Contoh from "@/lib/models/Contoh";
import dbconnect from "@/lib/testconnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbconnect(); //mastiin db aman sblm request
  try {
    const contohs = await Contoh.find({});
    return NextResponse.json(contohs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
