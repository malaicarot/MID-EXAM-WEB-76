import express from "express";
import { SERVER_CONFIG } from "./src/configs/server.config.js";
import { UserRouter } from "./src/routes/user.route.js";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'


const app = express();

app.use(express.json());

dotenv.config();

app.use(SERVER_CONFIG.RESOURCES.USER.CONTEXT_PATH, UserRouter);

main();

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Connect to DB success!");
    console.log("Waiting connect Server!");

    app.listen(SERVER_CONFIG.PORT, () => {
      console.log(`Server is connect at port ${SERVER_CONFIG.PORT}`);
    });
  } catch (error) {
   console.error("Error to connect DB:" + error.message)
  }
}
