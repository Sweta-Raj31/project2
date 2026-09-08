import mongoose from 'mongoose';
const schema = new mongoose.Schema({ project:{type:mongoose.Schema.Types.ObjectId,ref:'Project',required:true}, title:{type:String,required:true,trim:true}, description:{type:String,default:''}, status:{type:String,enum:['todo','doing','done'],default:'todo'}, priority:{type:String,enum:['low','medium','high'],default:'medium'}, assignee:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null}, createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true} },{timestamps:true});
schema.index({project:1,status:1,createdAt:-1}); schema.index({project:1,assignee:1});
export default mongoose.model('Task',schema);
