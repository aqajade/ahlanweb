



import mongoose from "mongoose";
const db = process.env.MONGODB_URL;
const konekmongodb = async () => {
  try {
    await mongoose.connect(db)
    console.log("konek alhamdulillah")
  } catch (error) {
    console.log(error)
  }
}
export default konekmongodb