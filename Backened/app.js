import express from "express";
const app=express();
import dotenv from "dotenv";
import db_connect from "./Database/db_connect.js";
import router from "./Routes/route.js";
import cors from "cors"
import jobroute from "./Routes/jobroute.js";
dotenv.config();
const Port=process.env.PORT||5000;
await db_connect();
app.use(express.json());
app.use(cors());
app.use("/",router);
app.use("/jobs",jobroute);



app.listen(Port,()=>{
    console.log(`The port is running on ${Port}`);
})
