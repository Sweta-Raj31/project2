import mongoose from 'mongoose';
const schema = new mongoose.Schema({ project:{type:mongoose.Schema.Types.ObjectId,ref:'Project',required:true}, task:{type:mongoose.Schema.Types.ObjectId,ref:'Task',required:true}, author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, text:{type:String,required:true,trim:true} },{timestamps:true});
schema.index({task:1,createdAt:-1});
export default mongoose.model('Comment',schema);
