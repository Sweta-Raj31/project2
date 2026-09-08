import express from 'express';
import Notification from '../models/Notification.js';
import {auth} from '../middleware/auth.js';
const r=express.Router();r.use(auth);
r.get('/',async(req,res,next)=>{try{const items=await Notification.find({user:req.user.sub}).sort({createdAt:-1}).limit(50).lean();res.json({items})}catch(e){next(e)}});
r.patch('/:id/read',async(req,res,next)=>{try{const item=await Notification.findOneAndUpdate({_id:req.params.id,user:req.user.sub},{read:true},{new:true}).lean();res.json({item})}catch(e){next(e)}});
export default r;
