import express from "express";
import "dotenv/config";
import dbConnnection from "./db.js";
import { Url } from "./Models/shortUrl.js";
import cors from "cors";
import { userRouter } from "./Routes/UserRoute.js";
import { isAuthenticated } from "./Controller/Auth.js";
import { ShortRouter } from "./Routes/ShortRouter.js";

// server initialization
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// db connection

dbConnnection();

app.use('/api',userRouter)
app.use('/api',isAuthenticated,ShortRouter)

app.listen(process.env.PORT, () => console.log("server started"));
