import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../middleware/auth.js';
const r=express.Router();
r.post('/register',async(req,res,next)=>{try{const {name,email,password}=req.body;if(!name||!email||!password||password.length<6)return res.status(400).json({message:'Name, email and 6+ character password required'});const exists=await User.findOne({email});if(exists)return res.status(409).json({message:'Email already registered'});const u=await User.create({name,email,password:await bcrypt.hash(password,12)});res.status(201).json({token:signToken(u),user:{id:u._id,name:u.name,email:u.email,role:u.role}})}catch(e){next(e)}});
r.post('/login',async(req,res,next)=>{try{const u=await User.findOne({email:req.body.email});if(!u||!(await bcrypt.compare(req.body.password,u.password)))return res.status(401).json({message:'Invalid credentials'});res.json({token:signToken(u),user:{id:u._id,name:u.name,email:u.email,role:u.role}})}catch(e){next(e)}});
export default r;
