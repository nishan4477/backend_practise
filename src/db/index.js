import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(
      `\nMongoDb connected successfully on port ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb connection fail", error);
    process.exit(1);
  }
};

export default connectDB;
