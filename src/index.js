import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server is running in the port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("failed to connect to the database");
  });
