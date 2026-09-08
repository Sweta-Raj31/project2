import mongoose from 'mongoose';
const schema = new mongoose.Schema({ name:{type:String,required:true,trim:true}, description:{type:String,default:''}, owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, members:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}] },{timestamps:true});
schema.index({owner:1,createdAt:-1}); schema.index({members:1,createdAt:-1});
export default mongoose.model('Project',schema);
