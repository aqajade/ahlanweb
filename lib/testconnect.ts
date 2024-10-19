import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbconnect() {
  if (connection.isConnected) {
    return; // Already connected
  }

  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    throw new Error("Please define the MONGODB_URL environment variable");
  }

  try {
    const db = await mongoose.connect(mongoUrl);
    connection.isConnected = db.connection.readyState; // Correctly set the connection state
  } catch (error) {
    console.error("Database connection failed:", error);
    throw new Error("Database connection failed");
  }
}

export default dbconnect;



// import mongoose from "mongoose";
// const connection: { isConnected?: number } = {};
// async function dbconnect() {
//   if (connection.isConnected) {
//     return;
//   }
//   const db = await mongoose.connect(process.env.MONGODB_URL!);
//   // connection.isConnected = db.connections[0].readyState;
//   connection.isConnected = db.connections[0].readyState;
// }
// export default dbconnect;  