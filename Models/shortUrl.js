import mongoose from "mongoose";
import shortid from "shortid";




const shortUrlSchema=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
       required:true,
       default:shortid.generate
    }
})

export const Url=mongoose.model('shortUrl',shortUrlSchema)
