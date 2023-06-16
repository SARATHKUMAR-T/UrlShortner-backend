import express from "express"
import "dotenv/config"
import dbConnnection from "./db.js"
import { Url } from "./Models/shortUrl.js"


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))


// db connection

dbConnnection()

// api
app.post("/short",async(req,res)=>{
    try {

      const full= await Url.findOne({full:req.body.fullUrl})

      res.status(200).json({message:"url fetched successfully" ,full})

      if(!full){
        const newUrl=await Url.create({full:req.body.fullUrl})
        res.status(200).json({message:'new url created successfully',newUrl})
        
      }
     

      
        
    } catch (error) {
        res.status(500).json({message:'Internal server error',error})
    }
})

app.listen(process.env.PORT,()=>console.log('server started'))