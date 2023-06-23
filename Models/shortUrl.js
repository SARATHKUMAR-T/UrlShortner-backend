import mongoose from "mongoose";
import shortid from "shortid";




const shortUrlSchema=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        default:shortid.generate,
        required:true,
    }
})

export const Url=mongoose.model('shortUrl',shortUrlSchema)
