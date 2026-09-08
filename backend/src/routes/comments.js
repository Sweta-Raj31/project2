import express from 'express';
import Comment from '../models/Comment.js';
import Project from '../models/Project.js';
import {auth} from '../middleware/auth.js';
import {io} from '../server.js';
const r=express.Router();r.use(auth);
r.get('/:taskId',async(req,res,next)=>{try{const items=await Comment.find({task:req.params.taskId}).populate('author','name').sort({createdAt:1}).lean();res.json({items})}catch(e){next(e)}});
r.post('/',async(req,res,next)=>{try{const p=await Project.exists({_id:req.body.project,$or:[{owner:req.user.sub},{members:req.user.sub}]});if(!p)return res.status(403).json({message:'Project access denied'});const item=await Comment.create({project:req.body.project,task:req.body.task,author:req.user.sub,text:req.body.text});const full=await Comment.findById(item._id).populate('author','name').lean();io.to(`project:${req.body.project}`).emit('comment:created',full);res.status(201).json({item:full})}catch(e){next(e)}});
export default r;
