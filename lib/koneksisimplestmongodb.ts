import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const db = process.env.MONGODB_URL;
const konekmongodb = async () => {
  try {
    if (!db) {
      throw new Error(
        "MONGODB_URL is not defined in the environment variables."
      );
    }
    await mongoose.connect(db);
    console.log("konek alhamdulillah");
  } catch (error) {
    console.log(error);
  }
};
export default konekmongodb;
