import express from "express";
import "dotenv/config";
import dbConnnection from "./db.js";
import { Url } from "./Models/shortUrl.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// db connection

dbConnnection();

// api
app.post("/short", async (req, res) => {
  try {
    const full = await Url.create({ full: req.body.fullUrl });

    res.status(200).json({ message: "url fetched successfully", full });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortId = await req.params.shortUrl;

    console.log(shortId);
    const final = await Url.findOne({ short: shortId });
    console.log(final.full);
    console.log('successfully redirected');
    res.redirect(final.full);

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.listen(process.env.PORT, () => console.log("server started"));
