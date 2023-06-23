import express from "express";
import mongoose from "mongoose";
import { Url } from "../Models/shortUrl.js";

// api

export const ShortRouter = express.Router();

ShortRouter.post("/short", async (req, res) => {
  try {
    const full = await new Url({ full: req.body.fullUrl }).save();
    res.status(200).json({ message: "short url created successfully", full });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// redirection request
ShortRouter.get("/:shortUrl", async (req, res) => {
  try {
    const shortId = await req.params.shortUrl;
    const final = await Url.findOne({ short: shortId });
    res.status(200).json({message:'short url fetched successfully ', final });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});
