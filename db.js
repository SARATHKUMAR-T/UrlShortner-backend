
import mongoose from "mongoose"


export function dbConnnection(){
    const params={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try {
        mongoose.connect("mongodb+srv://sarath:sarath@comfy.hjxp5lw.mongodb.net/?retryWrites=true&w=majority",params)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("error connecting Db",error);
    }
}

export default dbConnnection