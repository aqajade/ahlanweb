import mongoose, { mongo } from "mongoose";

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: String,
  image: {
    type: [String],
    require: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// kita cek apakah ada model Collection kalau g ada buat model tsb dg setingan collectionschema diatas
const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
