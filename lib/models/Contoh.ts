import mongoose, { Document, Schema, StringExpression } from "mongoose";
export interface IContoh extends Document {
  name: string;
  price: number;
  description: string;
}
const contohSchema:Schema =new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  description:{
    type:String,
  },
})

// klo udh ada models.contoh pakai tp kalau g buat berdasarkan contohSchema
const Contoh = mongoose.models.Contoh || mongoose.model<IContoh>("Contoh",contohSchema)

export default Contoh; // Don't forget to export your model