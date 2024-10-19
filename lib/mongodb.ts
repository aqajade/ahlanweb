import mongoose from "mongoose"
let isConnected:boolean = false //keep checking connection
export const connectToDB = async():Promise<void> => {
  mongoose.set("strictQuery",true)
  if (isConnected){
    console.log("mongodb connected alhamdulillah")
    return
  }
  try{
    await mongoose.connect(process.env.MONGODB_URL || "",{
      dbName: "Ahlancoding_Admin"
    })
    isConnected = true
    console.log("Connected alhamdulillah")
  } catch(err){
    // console.log(err)
    console.error("MongoDB error mas:", err);
  }
}
