const express = require("express");
const Phone = require("../Models/phones_model")
const router = express.Router()

router.post("",async(req,res)=>{
    try{
        const phones = await Phone.create(req.body)
        return res.status(200).send(phones)
    }
    catch(err)
    {
        return res.send(err)
    }
})

router.get("",async(req,res)=>{
    try{
        const phones = await Phone.find().lean().exec()
        return res.status(200).send(phones)
    }
    catch(err)
    {
        return res.send(err)
    }
})

router.get("/matchsort",async(req,res)=>{
    let key = req.query.phone
    let price = req.query.price || 1
    try{
        
        const phones = await Phone.find({$or:[{name:{$regex:key}}]})
        .sort({"price":price}).lean().exec();
        return res.send(phones);
    }
    catch(err){
        return res.send(err);
    }
})

router.get("/ten",async(req,res)=>{
    try{
        const phones = await Phone.find({price:{$lte:10000}}).lean().exec()
        return res.status(200).send(phones)
    }
    catch(err)
    {
        return res.send(err)
    }
})

router.get("/tenmatchsort",async(req,res)=>{
    let key = req.query.phone
    let price = req.query.price || 1
    try{
        
        const phones = await Phone.find({$and:[{price:{$lte:10000}},{$or:[{name:{$regex:key}}]}]})
        .sort({"price":price}).lean().exec();
        return res.send(phones);
    }
    catch(err){
        return res.send(err);
    }
})

router.get("/twenty",async(req,res)=>{
    try{
        const phones = await Phone.find({price:{$gte:10000}}).lean().exec()
        return res.status(200).send(phones)
    }
    catch(err)
    {
        return res.send(err)
    }
})

router.get("/twentymatchsort",async(req,res)=>{
    let key = req.query.phone
    let price = req.query.price || 1
    try{
        
        const phones = await Phone.find({$and:[{price:{$gte:10000}},{$or:[{name:{$regex:key}}]}]})
        .sort({"price":price}).lean().exec();
        return res.send(phones);
    }
    catch(err){
        return res.send(err);
    }
}) 

router.get("/details/:name",async(req,res)=>{
    console.log(req.params.name)
    try{
        const phone = await Phone.find({name:req.params.name}).lean().exec()
        return res.status(200).send(phone)
    }
    catch(err)
    {
        return res.send(err)
    }
})


router.put("/:id",async(req,res)=>{
    try{
        const phones = await Phone.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).send({message:"Phone Updated"})
    }
    catch(err){
        return res.send({message:"Failed to Update"});
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const phones = await Phone.findByIdAndDelete(req.params.id);
       return res.send({message:"Item Delted"});
    }
    catch(err){
        return res.send({message:"Could not delete"});
    }
})

module.exports = router;