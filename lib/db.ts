import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
const connect = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("alhamdulillah nyambung mongodb");
    return;
  }
  if (connectionState === 2) {
    console.log("masih mencoba...");
    return;
  }
  try {
    mongoose.connect(MONGODB_URL!, {
      dbName: "ahlanproject", //projectname sbnrnya,
      bufferCommands: false,
    });
    console.log("berhasil terhubung ke mongodb");
  } catch (error) {
    console.error("gagal terhubung ke mongodb", error);
    throw new Error("error mas")
  }
};

export default connect;
