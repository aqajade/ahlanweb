import { Schema,model,models } from "mongoose";

const CatatanSchema = new Schema({
  title: {type:String,required:true},
  description: {type:String},
  pengguna: {type:Schema.Types.ObjectId,ref:"user"},
})
const Catatan = models.Catatan || model("CatatanSchema")
export default Catatan 