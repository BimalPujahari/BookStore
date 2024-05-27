import express from 'express';
const router=express.Router();

import { Book } from '../models/bookModel.js';

router.get('/',async (req,res)=>{
try {
const books=await Book.find({});
res.status(200).json({
count:books.length,
data:books
});
} catch (error) {
console.log(error.message);
res.status(500).send({message:error.message});
}
})
//get a book by id
router.get('/:id',async (req,res)=>{
try {
const { id }=req.params;
const books=await Book.findById(id);
res.status(200).json({
count:books.length,
data:books
});
} catch (error) {
console.log(error.message);
res.status(500).send({message:error.message});
}
})
//post request
router.post('/',async (req,res)=>{
try {
if(
!req.body.title ||
!req.body.author ||
!req.body.publishYear 
){
return res.status(400).send({
message:'send all required fields:title,author,publishYear',
})        
}   
const newBook={
title:req.body.title,
author:req.body.author,
publishYear:req.body.publishYear
}

const book =await Book.create(newBook);
return res.status(201).send(book);
} 
catch (error) {
console.log(error.message);
res.status(500).send({message:error.message});
}
})
// route to update a book
router.put('/:id',async(req,res)=>{
try {
if(
!req.body.title ||
!req.body.author ||
!req.body.publishYear 
){
return res.status(400).send({
message:'send all required fields:title,author,publishYear',
})       
}

const { id } =req.params;

const result=await Book.findByIdAndUpdate(id,req.body)
if(!result){
return res.status(404).json({ msg:" Book not found "})
}
return res.status(200).json({msg:"Book updated successfully"})
} catch (error) {
console.log(error.message);
res.status(500).send({message:error.message});         
}
})
//delete a book
router.delete('/:id',async(req,res)=>{
try {
const { id }=req.params;
const result=await Book.findByIdAndDelete(id)
if(!result){
return res.status(404).json({ msg:" Book not found "})
}
return res.status(200).json({msg:"Book Deleted successfully"})

} catch (error) {
console.log(error.message);
res.status(500).send({message:error.message});         
}
})

export default router;
