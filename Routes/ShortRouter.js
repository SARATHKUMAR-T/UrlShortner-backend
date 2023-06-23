import express from "express";
import mongoose from "mongoose";
import { Url } from "../Models/shortUrl.js";

// api

export const ShortRouter = express.Router();
ShortRouter.post("/short", async (req, res) => {
  try {
    const full = await Url.create({ full: req.body.fullUrl });

    res.status(200).json({ message: "url fetched successfully", full });
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
    res.send(final.full);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});
