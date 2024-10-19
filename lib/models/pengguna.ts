import { Schema,model,models } from "mongoose";

const PenggunaSchema = new Schema({
  email: {type:String,required:true,unique:true},
  username: {type:String,required:true,unique:true},
  password: {type:String,required:true},
})
const Pengguna = models.Pengguna || model("PenggunaSchema")
export default Pengguna